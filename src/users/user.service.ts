import { BadRequestException, Injectable } from '@nestjs/common';

// import { UpdateDto } from './dto/update-.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {

  }
  create(createDto: CreateUserDto) {
    const userCreated = new this.userModel(createDto)
    return userCreated.save()
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    try {
        let dataItem = await this.userModel.findById(id).exec()
      if(!dataItem) {
      throw new BadRequestException(`id is not valid`)
    }
    return dataItem
    } catch (error) {
      throw new BadRequestException(error)
      
    }
  
  }

  // update(id: number, updateDto: UpdateDto) {
  //   return `This action updates a #id `;
  // }

  // remove(id: number) {
  //   return `This action removes a #id `;
  // }
}
