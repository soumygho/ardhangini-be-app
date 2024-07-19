import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class CreateProductResponseDto extends CreateProductDto {
  @ApiProperty()
  averageReview: number;
  @ApiProperty()
  numberOfReviews: number;
  @ApiProperty()
  currentPrice: number;
  @ApiProperty()
  offerPrice: number;
  @ApiProperty()
  isBestSeller: boolean;
  @ApiProperty()
  availableQuantity: number;
  @ApiProperty()
  discountPercentage: number;
}
