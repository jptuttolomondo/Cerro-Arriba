import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createUser = await this.userModel.create(createUserDto);
    return createUser;
  }

  async findAll(): Promise<UserDocument[]> {
    const userRead = await this.userModel.find();
    return userRead;
  }

  async findOne(id: string) {
    const user = await this.userModel.find({ _id: id });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(id, updateUserDto);
    const userUpdated = await this.userModel.findOne({ _id: id });
    return userUpdated;
  }

  async remove(id: string) {
    const user = await this.userModel.deleteOne({ _id: id });

    return user;
  }
}
