import { ApiProperty } from '@nestjs/swagger';
import { OrderType } from '../enum/order.enum';
import { PaymentMethod } from 'src/product/payment/enum/payment-method.enum';

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
  @ApiProperty()
  deliveryAddress: string;
  @ApiProperty()
  billingAddress: string;
  @ApiProperty({
    enum: PaymentMethod,
    required: true,
    default: PaymentMethod.COD,
  })
  paymentMethod: PaymentMethod;
}

//validate promos
//validate stock of the line items
