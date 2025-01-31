import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './schema/order.schema';
import { UserDetails, UserDetailsSchema } from './schema/userDetails.schema';
import { CartItem, CartSchema } from './schema/cart.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name, //collection
        schema: OrderSchema,
      },
      {
        name: UserDetails.name, //collection
        schema: UserDetailsSchema,
      },
      {
        name: CartItem.name, //collection
        schema: CartSchema,
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, WhatsappService],
})
export class OrdersModule {}
