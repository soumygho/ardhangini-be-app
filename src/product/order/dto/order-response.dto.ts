import { OrderType, OrderStatus } from '../enum/order.enum';
import { OrderCancellationReasonType } from '../enum/order-cancellation-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class OrderLineItemResponse {
  @ApiProperty()
  productTypeId: string;
  @ApiProperty()
  productId: string;
  @ApiProperty()
  productName: string;
  @ApiProperty()
  productThumbnail: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  actualPrice: number;
  @ApiProperty()
  offerPrice: number;
  @ApiProperty()
  promoDiscount: number;
  @ApiProperty()
  promoDescription: string;
  @ApiProperty()
  totalSgst: number;
  @ApiProperty()
  totalCgst: number;
  @ApiProperty()
  finalTotalPrice: number;
}
export class OrderResponse {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  cartId: string;
  @ApiProperty()
  userName: string;
  @ApiProperty()
  userEmail: string;
  @ApiProperty()
  userMobile: string;
  @ApiProperty()
  orderType: string;
  @ApiProperty()
  OrderStatus: string;
  @ApiProperty()
  orderCancellationType: string;
  @ApiProperty()
  orderCancellationReason: string;
  @ApiProperty()
  totalActualPrice: number;
  @ApiProperty()
  totalFinalPrice: number;
  @ApiProperty()
  totalCgst: number;
  @ApiProperty()
  totalSgst: number;
  @ApiProperty({
    type: OrderLineItemResponse,
    isArray: true,
  })
  cartLineItems: OrderLineItemResponse[];
}
