import { SareeDetailsEntity } from '../entities/saree/saree-details.entity';
import { ProductSnapshotDto } from '../dto/product-snapshot.dto';
import { BaseMapper } from 'src/common/mapper/base.mapper';
import { SareeEntity } from '../entities';
import { SareeDetailsDto } from '../dto/saree-details.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SareeDetailsMapper extends BaseMapper<
  SareeEntity,
  ProductSnapshotDto
> {
  public mapFrom(source: SareeEntity): ProductSnapshotDto {
    const productSnapshot: ProductSnapshotDto = new ProductSnapshotDto();
    productSnapshot.productid = source.id;
    productSnapshot.actualprice = source.actualprice;
    productSnapshot.availableQuantity = source.available_qty;
    productSnapshot.averageReview = source.averageReview;
    productSnapshot.category = source.category.name;
    productSnapshot.isBestSeller = source.isBestSeller;
    productSnapshot.isNew = true;
    productSnapshot.isTrending = true;
    productSnapshot.offerprice = source.offerprice;
    productSnapshot.productDetails = this.mapToSareeDetailsDto(source);
    productSnapshot.productdescription = source.productDescription;
    productSnapshot.productname = source.productName;
    productSnapshot.producttype = source.productType.name;
    productSnapshot.return_exchange_policy = source.returnExchangePolicy;
    productSnapshot.skuid = source.skuid;
    productSnapshot.subcategory = source.subCategory.name;
    productSnapshot.maxQuantityPerCart = source.maxQuantityPerCart;
    productSnapshot.promoDetails = source.promoDetails;
    return productSnapshot;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public mapTo(_target: ProductSnapshotDto): SareeEntity {
    throw new Error('Method not implemented.');
  }

  private mapToSareeDetailsDto(sareeEntity: SareeEntity): SareeDetailsDto {
    const sareeDetailsDto: SareeDetailsDto = new SareeDetailsDto();
    const sareeDetails: SareeDetailsEntity = sareeEntity.sareeDetails;
    sareeDetailsDto.blouse_desc = sareeDetails.blouse_desc;
    sareeDetailsDto.blouse_piece = sareeDetails.blousePieceIncluded;
    sareeDetailsDto.fabricDescription =
      sareeDetails.fabricDetails.fabricDescription;
    sareeDetailsDto.fabricname = sareeDetails.fabricDetails.fabricName;
    sareeDetailsDto.length = sareeDetails.length;
    sareeDetailsDto.width = sareeDetails.width;
    sareeDetailsDto.washcare = sareeDetails.fabricDetails.washCare;
    sareeDetailsDto.sareeImages = sareeEntity.productImages;
    return sareeDetailsDto;
  }
}
