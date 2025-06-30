import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/User.schema';
import { QueryFilterUserDTO } from './dto/QueryFilterUser.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.model.findById(id).exec();
  }

  async create(data: Partial<User>): Promise<User> {
    const created = new this.model(data);
    return created.save();
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); //new: true sẽ trả về object trước khi update, false sẽ trả về object sau update
  }

  async delete(id: string): Promise<User | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
  async findAllAndPaginate(dto: QueryFilterUserDTO) {
   const  {page, pageSize, filter} = dto
    const skipItem = (page - 1) * pageSize
    return await Promise.all([
      this.model.find(filter).skip(skipItem).limit(pageSize).exec(),
      this.model.countDocuments(filter)
     ])
  }
}
