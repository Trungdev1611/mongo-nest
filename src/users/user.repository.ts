import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/User.schema';

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
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<User | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}