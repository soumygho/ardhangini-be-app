import { ApiProperty } from '@nestjs/swagger';

export class CartLineItemDto {
  @ApiProperty({ required: true })
  productId: string;
  //we will need it once we have more productType added as now we are supporting only one type of product
  @ApiProperty({ required: false })
  typeId: string;
  @ApiProperty({ required: true })
  quantity: number;
}

export class CartUpdateDto {
  @ApiProperty({ required: true })
  userId: string;
  @ApiProperty({ type: CartLineItemDto, required: true, isArray: true })
  lineItems: CartLineItemDto[];
}
