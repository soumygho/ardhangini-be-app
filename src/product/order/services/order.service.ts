import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { DataSource, Repository } from 'typeorm';
import { OrderDetailsEntity } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderTransaction } from '../transactions/create-order.transaction';
import { OrderDetailsMapper } from '../mapper/order-details.mapper';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(OrderDetailsEntity)
    private readonly orderRepository: Repository<OrderDetailsEntity>,
    private readonly createOrderTransaction: CreateOrderTransaction,
    private readonly orderDetailsMapper: OrderDetailsMapper,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.createOrderTransaction.run(createOrderDto);
  }

  async findAll() {
    return (await this.orderRepository.find())?.map((orderDetails) => {
      return this.orderDetailsMapper.convertToOrderResponse(orderDetails);
    });
  }

  async findAllByUserId(userId: string) {
    const userEntity = await this.dataSource
      .getRepository(UserEntity)
      .findOneBy({ id: userId });
    if (!userEntity) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return (await this.orderRepository.findBy({ user: userEntity }))?.map(
      (orderDetails) => {
        return this.orderDetailsMapper.convertToOrderResponse(orderDetails);
      },
    );
  }

  cancelOrder(userId: string, orderId: string) {
    return 'cancel the order';
  }

  rejectOrder() {
    return 'reject order';
  }

  returnOrder(userId: string, orderId: string) {
    return 'return order';
  }

  completeCodOrder() {
    return 'complete cod order';
  }

  updateOrderEvent() {
    return 'Update Order event';
  }
}
