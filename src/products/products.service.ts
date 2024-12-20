import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './schema/product.schema';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) readonly ProductModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const createProduct = await this.ProductModel.create(createProductDto);
      return createProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<ProductDocument[]> {
    try {
      const products = await this.ProductModel.find();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    const product = await this.ProductModel.findOne({ _id: id });

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.ProductModel.findByIdAndUpdate(id, updateProductDto);
    const ProductUpdated = await this.ProductModel.findOne({ _id: id });
    return ProductUpdated;
  }

  async remove(id: string) {
    const product = await this.ProductModel.deleteOne({ _id: id });
    return product;
  }
}

/*import { Injectable } from '@nestjs/common';
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




  import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
  import { HydratedDocument } from 'mongoose';
  export type UserDocument = HydratedDocument<User>;
  
  @Schema()
  export class User {
    @Prop({ required: true })
    first_name: string;
  
    @Prop({ required: true })
    last_name: string;
  
    @Prop({ required: true, unique: true })
    email: string;
  
    @Prop({ required: true })
    age: number;
  
    @Prop({ required: true })
    password: string;
  
    // @Prop() cart: []
  
    //  @Prop() role: []
  }
  export const UserSchema = SchemaFactory.createForClass(User);
  
    */
