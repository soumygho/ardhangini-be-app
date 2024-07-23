import { ApiProperty } from '@nestjs/swagger';

export class CartLineItemDto {
  @ApiProperty({ required: true })
  productId: string;
  @ApiProperty({ required: true })
  typeId: string;
  @ApiProperty({ required: true })
  quantity: number;
}

export class CartUpdateDto {
  @ApiProperty({ required: false })
  cartId: string;
  @ApiProperty({ required: true })
  userId: string;
  @ApiProperty({ type: CartLineItemDto, required: true, isArray: true })
  lineItems: CartLineItemDto[];
}
