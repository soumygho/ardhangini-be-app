import { ApiProperty } from '@nestjs/swagger';
import { WishListLineItemDto } from './wishlist-update.dto';

export class WishListLineItemResponse extends WishListLineItemDto {
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
  sgst: number;
  @ApiProperty()
  cgst: number;
  @ApiProperty()
  availableQuantity: number;
}

export class WishListDetailsResponse {
  @ApiProperty()
  wishListId: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  lineItems: WishListLineItemResponse[];
}
