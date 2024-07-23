import { ApiProperty } from '@nestjs/swagger';
import { OrderType } from '../enum/order.enum';

export class CreateOrderDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  cartId: string;
  @ApiProperty({
    enum: OrderType,
    required: true,
    default: OrderType.COD,
  })
  orderType: OrderType;
}
