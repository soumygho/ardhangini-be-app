import { ApiProperty } from '@nestjs/swagger';
import { SareeDetailsDto } from './saree-details.dto';

export class ProductSnapshotDto {
  @ApiProperty()
  productid: string;
  @ApiProperty()
  producttype: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  subcategory: string;
  @ApiProperty()
  skuid: string;
  @ApiProperty()
  productname: string;
  @ApiProperty()
  productdescription: string;
  @ApiProperty()
  offerprice: number;
  @ApiProperty()
  actualprice: number;
  @ApiProperty()
  isTrending: boolean;
  @ApiProperty()
  isBestSeller: boolean;
  @ApiProperty()
  isNew: boolean;
  @ApiProperty()
  availableQuantity: number;
  @ApiProperty()
  averageReview: number;
  @ApiProperty()
  return_exchange_policy: string;
  @ApiProperty()
  productDetails: SareeDetailsDto;
}
