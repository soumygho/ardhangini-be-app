import { ApiProperty } from '@nestjs/swagger';
import { CartLineItemDto } from './cart-update.dto';

export class CartLineItemResponse extends CartLineItemDto {
  @ApiProperty()
  productId: string;
  @ApiProperty()
  productTypeId: string;
  @ApiProperty()
  productThumbnail: string;
  @ApiProperty()
  productName: string;
  @ApiProperty()
  actualPricePerItem: number;
  @ApiProperty()
  finalPricePerItem: number;
  @ApiProperty()
  actualTotalPrice: number;
  @ApiProperty()
  finalTotalPrice: number;
  @ApiProperty()
  totalSgst: number;
  @ApiProperty()
  totalCgst: number;
  @ApiProperty()
  quantity: number;
}

export class CartDetailsResponse {
  @ApiProperty()
  cartId: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  cartLineItems: CartLineItemResponse[];
  @ApiProperty()
  actualTotalPrice: number;
  @ApiProperty()
  finalTotalPrice: number;
  @ApiProperty()
  totalSgst: number;
  @ApiProperty()
  totalCgst: number;
  @ApiProperty()
  shipping: number;
}
