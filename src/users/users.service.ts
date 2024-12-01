import { Injectable ,Get} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schema/users.schema';

@Injectable()
export class UsersService {

constructor(

  @InjectModel(User.name) readonly userModel:Model<UserDocument>,

){}


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    let user=[]
   const userRead=await this.userModel.find().lean()
    return user.push(userRead);
  }

  findOne(id: number) {
    return this.userModel.find({id:id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
