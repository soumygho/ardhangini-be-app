import { SareeEntity } from 'src/product/product-details';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductTypes } from 'src/product/product-type/enum/product-type.enum';
import { WishListEntity } from '../entity/wishlist.entity';
import {
  WishListDetailsResponse,
  WishListLineItemResponse,
} from '../dto/wishlist-response.dto';

@Injectable()
export class WishListResponseMapper {
  constructor(private readonly dataSource: DataSource) {}
  public convertLineItemResponse(
    wishListDetails: WishListEntity,
  ): WishListLineItemResponse[] {
    const lineItems: WishListLineItemResponse[] = [];
    wishListDetails.lineItems.forEach(async (lineItemEntity) => {
      if (
        lineItemEntity.productType.name.toLowerCase() === ProductTypes.SAREE
      ) {
        const sareeRepository: Repository<SareeEntity> =
          this.dataSource.getRepository(SareeEntity);
        const saree: SareeEntity = await sareeRepository.findOneBy({
          id: lineItemEntity.productId,
        });
        //construct each cartLineitem response
        const cartLineItemResponse: WishListLineItemResponse =
          new WishListLineItemResponse();
        Object.assign(cartLineItemResponse, lineItemEntity);
        cartLineItemResponse.productId = lineItemEntity.productId;
        cartLineItemResponse.productTypeId = lineItemEntity.productType.id;
        cartLineItemResponse.productName = saree.productName;
        cartLineItemResponse.productThumbnail =
          saree.productImages[0]!.thumbnailSource;
        cartLineItemResponse.actualPricePerItem = saree.actualprice;
        cartLineItemResponse.finalPricePerItem =
          saree.offerprice + saree.offerprice * 0.12 * 2;
        cartLineItemResponse.sgst = saree.sgst;
        cartLineItemResponse.cgst = saree.cgst;
        cartLineItemResponse.availableQuantity = saree.available_qty;
        lineItems.push(cartLineItemResponse);
      }
    });
    return lineItems;
  }

  public async convertToWishListResponse(
    wishListEntity: WishListEntity,
  ): Promise<WishListDetailsResponse> {
    const cartDetailsResponse: WishListDetailsResponse =
      new WishListDetailsResponse();
    cartDetailsResponse.wishListId = wishListEntity.id;
    cartDetailsResponse.userId = wishListEntity.user.id;
    cartDetailsResponse.lineItems =
      this.convertLineItemResponse(wishListEntity);
    return cartDetailsResponse;
  }
}
