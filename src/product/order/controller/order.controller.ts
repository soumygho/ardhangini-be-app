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
    description: 'get all orders for user',
  })
  @ApiOkResponse({
    description: 'Order Response',
    type: OrderResponse,
    isArray: true,
  })
  @Get(':userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.orderService.findAllByUserId(userId);
  }

  @Post('return')
  returnOrder() {
    return this.orderService.returnOrder();
  }

  @Post('complete-cod-order')
  completeCodOrder() {
    return this.orderService.completeCodOrder();
  }

  @Post('cancel')
  cancelOrder() {
    return this.orderService.cancelOrder();
  }

  @Post('reject')
  rejectOrder() {
    return this.orderService.rejectOrder();
  }
}
