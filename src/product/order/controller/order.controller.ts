import { CreateOrderDto } from './../dto/create-order.dto';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { OrderResponse } from '../dto/order-response.dto';

@Controller('order-details')
@ApiTags('Order Api')
export class OrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @ApiOperation({
    description: 'place an order',
  })
  @ApiOkResponse({
    description: 'Order Response',
    type: OrderResponse,
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({
    description: 'get all orders for admin',
  })
  @ApiOkResponse({
    description: 'Order Response',
    type: OrderResponse,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiOperation({
    description: 'get all orders for user (admin api)',
  })
  @ApiOkResponse({
    description: 'Order Response for admin',
    type: OrderResponse,
    isArray: true,
  })
  @Get('/admin/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.orderService.findAllByUserId(userId);
  }

  @ApiOperation({
    description: 'get all orders for user (user api)',
  })
  @ApiOkResponse({
    description: 'Order Response for User',
    type: OrderResponse,
    isArray: true,
  })
  @Get(':userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.orderService.findAllByUserId(userId);
  }

  @Post('return/:userId/:orderId')
  returnOrder(
    @Param('userId') userId: string,
    @Param('orderId') orderId: string,
  ) {
    return this.orderService.returnOrder(userId, orderId);
  }

  @Post('admin/complete-cod-order')
  completeCodOrder() {
    return this.orderService.completeCodOrder();
  }

  @Post('cancel/:userId/:orderId')
  cancelOrder(
    @Param('userId') userId: string,
    @Param('orderId') orderId: string,
  ) {
    return this.orderService.cancelOrder(userId, orderId);
  }

  @Post('admin/reject')
  rejectOrder() {
    return this.orderService.rejectOrder();
  }
}
