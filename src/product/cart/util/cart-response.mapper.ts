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
  public async convertLineItemResponse(
    cartDetails: CartDetailsEntity,
  ): Promise<CartLineItemResponse[]> {
    const response = await Promise.all(
      cartDetails?.lineItems?.map(async (lineItemEntity) => {
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
          const actualPricePerItem =
            Number.parseFloat(saree.actualprice + '') +
            2 * Number.parseFloat(saree.actualprice + '') * 0.12;
          const finalPricePerItem =
            Number.parseFloat(saree.offerprice + '') +
            2 * Number.parseFloat(saree.offerprice + '') * 0.12;
          const finalTotalPrice =
            Number.parseFloat(saree.offerprice + '') *
              Number.parseFloat(lineItemEntity.quantity + '') +
            2 *
              Number.parseFloat(saree.offerprice + '') *
              Number.parseFloat(lineItemEntity.quantity + '') *
              0.12;
          const actualTotalPrice =
            Number.parseFloat(saree.actualprice + '') *
              Number.parseFloat(lineItemEntity.quantity + '') +
            2 *
              Number.parseFloat(saree.actualprice + '') *
              Number.parseFloat(lineItemEntity.quantity + '') *
              0.12;
          cartLineItemResponse.productId = lineItemEntity.productId;
          cartLineItemResponse.productTypeId = lineItemEntity.productType.id;
          cartLineItemResponse.productName = saree.productName;
          cartLineItemResponse.productThumbnail =
            saree?.productImages[0]?.imageSource;
          cartLineItemResponse.actualPricePerItem = actualPricePerItem;
          cartLineItemResponse.finalPricePerItem = finalPricePerItem;
          cartLineItemResponse.quantity = lineItemEntity.quantity;
          cartLineItemResponse.actualTotalPrice = actualTotalPrice;
          cartLineItemResponse.finalTotalPrice = finalTotalPrice;
          cartLineItemResponse.totalSgst =
            Number.parseFloat(saree.offerprice + '') *
            Number.parseFloat(lineItemEntity.quantity + '') *
            0.12;
          cartLineItemResponse.totalCgst =
            Number.parseFloat(saree.offerprice + '') *
            Number.parseFloat(lineItemEntity.quantity + '') *
            0.12;
          return cartLineItemResponse;
        }
      }),
    );
    return response;
  }

  public async convertCartResponse(
    cartDetailsEntity: CartDetailsEntity,
  ): Promise<CartDetailsResponse> {
    const cartDetailsResponse: CartDetailsResponse = new CartDetailsResponse();
    const cartEntity = await this.dataSource
      .getRepository(CartDetailsEntity)
      .findOneBy({ id: cartDetailsEntity.id });
    console.trace(cartEntity);
    cartDetailsResponse.cartId = cartDetailsEntity.id;
    cartDetailsResponse.userId = cartEntity.userDetails.id;
    cartDetailsResponse.cartLineItems =
      await this.convertLineItemResponse(cartEntity);
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
