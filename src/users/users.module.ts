import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema,User } from './schema/users.schema';




@Module({


imports:[
MongooseModule.forFeature([{
  name:User.name,//collection
  schema:UserSchema
}]
)
],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
