import { ApiProperty } from '@nestjs/swagger';

export class WishListLineItemDto {
  @ApiProperty({ required: true })
  productId: string;
  @ApiProperty({ required: true })
  typeId: string;
}

export class WishListUpdateDto {
  @ApiProperty({ required: true })
  userId: string;
  @ApiProperty({ type: WishListLineItemDto, required: true, isArray: true })
  lineItems: WishListLineItemDto[];
}
