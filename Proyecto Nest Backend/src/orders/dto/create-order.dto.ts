import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  cartItems: any[];

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsNotEmpty()
  userDetails: {
    name: string;
    deliveryTime: string;
    email: string;
    location: string;
    paymentMethod: string;
    whatsapp: string;
  };
}
