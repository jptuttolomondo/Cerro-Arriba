import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<CartItem>;

@Schema()
export class CartItem {
  @Prop({ required: true }) _id: string;

  @Prop({ required: true }) product_name: string;

  @Prop({ required: true, unique: true }) price: number;

  @Prop({ required: true }) quantity: number;
}
export const CartSchema = SchemaFactory.createForClass(CartItem);
