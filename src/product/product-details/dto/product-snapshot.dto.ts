import { ApiProperty } from '@nestjs/swagger';
import { SareeDetailsDto } from './saree-details.dto';
import { PromoDetailsEntity } from 'src/product/promo/entity/promo-details.entity';
import { ProductCollectionEntity } from 'src/product/collections/entity/product-collection.entity';
import { ProductStyleEntity } from 'src/product/product-style/entity/product-style.entity';
import { ProductOccassionEntity } from 'src/product/product-occasion/entity/product-occassion.entity';
import { ProductColorEntity } from 'src/product/colours/entity/product-colour.entity';
import { ProductPrintsEntity } from 'src/product/prints/entity/product-prints.entity';

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
  availableQuantity: number;
  @ApiProperty()
  averageReview: number;
  @ApiProperty()
  return_exchange_policy: string;
  @ApiProperty()
  productDetails: SareeDetailsDto;
  @ApiProperty()
  maxQuantityPerCart: number;
  @ApiProperty({ type: PromoDetailsEntity, required: false })
  promoDetails: PromoDetailsEntity;
  //filterable properties
  @ApiProperty()
  isTrending: boolean;
  @ApiProperty()
  isBestSeller: boolean;
  @ApiProperty()
  isNew: boolean;
  @ApiProperty()
  isExclusive: boolean;
  @ApiProperty()
  isShippable: boolean;

  @ApiProperty({
    type: ProductCollectionEntity,
  })
  productCollection: ProductCollectionEntity;

  @ApiProperty({
    type: ProductStyleEntity,
  })
  productStyle: ProductStyleEntity;

  @ApiProperty({
    type: ProductOccassionEntity,
  })
  productOccassion: ProductOccassionEntity;

  @ApiProperty({
    type: ProductColorEntity,
  })
  productColour: ProductColorEntity;

  @ApiProperty({
    type: ProductPrintsEntity,
  })
  productPrint: ProductPrintsEntity;

  @ApiProperty()
  maxAllowedReturnDays: number;

  @ApiProperty()
  maxAllowedCancellationDays: number;
}
