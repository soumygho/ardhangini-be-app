import { CartDetailsResponse } from 'src/product/cart/dto/cart-response.dto';
import { OrderType, OrderStatus } from '../enum/order.enum';
import { OrderCancellationReasonType } from '../enum/order-cancellation-type.enum';

export class OrderResponse {
  userId: string;
  userName: string;
  userEmail: string;
  userMobile: string;
  cartDetails: CartDetailsResponse;
  orderType: OrderType;
  OrderStatus: OrderStatus;
  orderCancellationType: OrderCancellationReasonType;
  orderCancellationReason: string;
}
