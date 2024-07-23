import { SareeEntity } from 'src/product/product-details';
import {
  CartDetailsResponse,
  CartLineItemResponse,
} from '../dto/cart-response.dto';
import { Injectable } from '@nestjs/common';
import { CartDetailsEntity } from '../entity/cart-details.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductTypes } from 'src/product/product-type/enum/product-type.enum';

@Injectable()
export class CartResponseMapper {
  constructor(private readonly dataSource: DataSource) {}
  public convertLineItemResponse(
    cartDetails: CartDetailsEntity,
  ): CartLineItemResponse[] {
    const lineItems: CartLineItemResponse[] = [];
    cartDetails.lineItems.forEach(async (lineItemEntity) => {
      if (
        lineItemEntity.productType.name.toLowerCase() === ProductTypes.SAREE
      ) {
        const sareeRepository: Repository<SareeEntity> =
          this.dataSource.getRepository(SareeEntity);
        const saree: SareeEntity = await sareeRepository.findOneBy({
          id: lineItemEntity.productId,
        });
        //construct each cartLineitem response
        const cartLineItemResponse: CartLineItemResponse =
          new CartLineItemResponse();
        Object.assign(cartLineItemResponse, lineItemEntity);
        cartLineItemResponse.productName = saree.productName;
        cartLineItemResponse.productThumbnail =
          saree.productImages[0]!.thumbnailSource;
        cartLineItemResponse.actualPricePerItem = saree.actualprice;
        cartLineItemResponse.finalPricePerItem = saree.offerprice;
        cartLineItemResponse.actualTotalPrice =
          saree.actualprice * lineItemEntity.quantity;
        cartLineItemResponse.finalTotalPrice =
          saree.offerprice * lineItemEntity.quantity;
        cartLineItemResponse.totalSgst = saree.sgst * lineItemEntity.quantity;
        cartLineItemResponse.totalCgst = saree.cgst * lineItemEntity.quantity;
        lineItems.push(cartLineItemResponse);
      }
    });
    return lineItems;
  }

  public async convertCartResponse(
    cartDetailsEntity: CartDetailsEntity,
  ): Promise<CartDetailsResponse> {
    const cartDetailsResponse: CartDetailsResponse = new CartDetailsResponse();
    cartDetailsResponse.cartId = cartDetailsEntity.id;
    cartDetailsResponse.userId = cartDetailsEntity.userDetails.id;
    cartDetailsResponse.cartLineItems =
      this.convertLineItemResponse(cartDetailsEntity);
    let totalFinalPrice = 0;
    let totalActualPrice = 0;
    let totalSgst = 0;
    let totalCgst = 0;
    cartDetailsResponse.cartLineItems.map((lineItem) => {
      totalActualPrice = totalActualPrice + lineItem.actualPricePerItem;
      totalFinalPrice = totalFinalPrice + lineItem.finalPricePerItem;
      totalSgst = totalSgst + lineItem.totalSgst;
      totalCgst = totalCgst + lineItem.totalCgst;
    });

    cartDetailsResponse.actualTotalPrice = totalActualPrice;
    cartDetailsResponse.finalTotalPrice = totalFinalPrice;
    cartDetailsResponse.totalCgst = totalCgst;
    cartDetailsResponse.totalSgst = totalSgst;
    return cartDetailsResponse;
  }
}
