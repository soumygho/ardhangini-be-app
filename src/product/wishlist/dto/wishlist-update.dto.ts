import { ApiProperty } from '@nestjs/swagger';
import * as request from 'supertest';

export class WishListLineItemDto {
  @ApiProperty({ required: true })
  productId: string;
  @ApiProperty({ required: false })
  typeId: string;
}

export class WishListUpdateDto {
  @ApiProperty({ required: true })
  userId: string;
  @ApiProperty({ type: WishListLineItemDto, required: true, isArray: true })
  lineItems: WishListLineItemDto[];
}
