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
    const orderEntity = await this.createOrderTransaction.run(createOrderDto);
    return await this.orderDetailsMapper.convertToOrderResponse(orderEntity);
  }

  async findAll() {
    return await Promise.all(
      (await this.orderRepository.find())?.map(async (orderDetails) => {
        return await this.orderDetailsMapper.convertToOrderResponse(
          orderDetails,
        );
      }),
    );
  }

  async findAllByUserId(userId: string) {
    const userEntity = await this.dataSource
      .getRepository(UserEntity)
      .createQueryBuilder()
      .andWhere('id = :userId', { userId: userId })
      .getOne();

    if (!userEntity) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return Promise.all(
      (
        await this.orderRepository
          .createQueryBuilder()
          .andWhere('user_id = :userId', { userId: userId })
          .getMany()
      )?.map(async (orderDetails) => {
        return await this.orderDetailsMapper.convertToOrderResponse(
          orderDetails,
        );
      }),
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
