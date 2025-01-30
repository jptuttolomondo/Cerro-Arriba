import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDetailsDocument = HydratedDocument<UserDetails>;

@Schema()
export class UserDetails {
  @Prop({ required: true }) name: string;

  @Prop({ required: true }) deliveryTime: string;

  @Prop() email: string;

  @Prop({ required: true, unique: true }) location: string;

  @Prop({ required: true }) paymentMethod: string;

  @Prop({ required: true }) whatsapp: string;
}
export const UserDetailsSchema = SchemaFactory.createForClass(UserDetails);
