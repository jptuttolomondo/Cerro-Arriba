import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import {HydratedDocument}from 'mongoose'
export type UserDocument =HydratedDocument<User>

@Schema()
export class User{

    @Prop({required:true}) first_name:String

    @Prop({required:true}) last_name:String

    @Prop({required:true,unique:true}) email:String

    @Prop({required:true}) age:Number

    @Prop({required:true}) password: String

   // @Prop() cart: []

  //  @Prop() role: []

}
export const UserSchema= SchemaFactory.createForClass(User)






