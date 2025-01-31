import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) readonly OrderModel: Model<Order>) {}
  async create(createOrderDto: CreateOrderDto) {
    try {
      const createOrder = await this.OrderModel.create(createOrderDto);
      return createOrder;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const getAllOrders = await this.OrderModel.find();
      return getAllOrders;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const getOrderById = await this.OrderModel.findById(id);
      return getOrderById;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      await this.OrderModel.findByIdAndUpdate(id, updateOrderDto);
      const OrderUpdated = await this.OrderModel.findById(id);
      return OrderUpdated;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const getOrderById = await this.OrderModel.findByIdAndDelete(id);
      return getOrderById;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
