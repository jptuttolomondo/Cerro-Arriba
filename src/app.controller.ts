import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { UsersService } from './users/users.service';
import { OrdersService } from './orders/orders.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
@Controller('orders')
export class OrdersController {
  constructor(private readonly appService: OrdersService) {}
}

@Controller('products')
export class ProductsController {
  constructor(private readonly appService: ProductsService) {}
}
@Controller('users')
export class UsersController {
  constructor(private readonly appService: UsersService) {}
}
