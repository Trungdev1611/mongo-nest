import { BadRequestException, Injectable } from '@nestjs/common';

// import { UpdateDto } from './dto/update-.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './user.repository';
import { UpdateDto } from './dto/updateUser.dto';
import { QueryFilterUserDTO } from './dto/QueryFilterUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userRepo: UserRepository,
  ) {}
  create(createDto: CreateUserDto) {
    const userCreated = new this.userModel(createDto);
    return userCreated.save();
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    try {
      const dataItem = await this.userModel.findById(id).exec();
      if (!dataItem) {
        throw new BadRequestException(`id is not valid`);
      }
      return dataItem;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAllCustomModel() {
    try {
      return this.userRepo.findAll();
    } catch (error) {
      throw new BadRequestException(error)
    }

  }

  async update(id: string, updateDto: UpdateDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    try {
      return await this.userRepo.update(id, updateDto)
    } catch (error) {
      throw new BadRequestException(error)
    }
   
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID format');
    }
    try {
      return await this.userRepo.delete(id)
    } catch (error) {
      throw new BadRequestException(error)
    }
   
  }

  async findAndPaginate(dto: QueryFilterUserDTO) {
    const filter = {
      ...dto.filter,
      ...(dto.username && {
        username: { $regex: dto.username, $options: 'i' }
      })
    }
    return this.userRepo.findAllAndPaginate({...dto, filter})
  }
}
