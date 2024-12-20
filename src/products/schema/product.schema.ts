/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true }) product_name: string;

  @Prop() image: string;

  @Prop({ required: true, unique: true }) description: string;

  @Prop({ required: true }) quantity_stock: number;

  @Prop({ required: true }) price: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
