import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CartItem } from '../entities/order.entity';
import { UserDetails } from '../entities/order.entity';
export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true }) cartItems: CartItem[];

  @Prop() totalPrice: number;

  @Prop({ required: true, unique: true }) userDetails: UserDetails;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
