import { SareeEntity } from 'src/product/product-details';
import { ProductTypes } from 'src/product/product-type/enum/product-type.enum';
import { DataSource, Repository } from 'typeorm';
import {
  OrderLineItemResponse,
  OrderResponse,
} from '../dto/order-response.dto';
import { OrderDetailsEntity } from '../entities/order.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderDetailsMapper {
  constructor(private readonly dataSource: DataSource) {}
  public convertLineItemResponse(
    orderDetails: OrderDetailsEntity,
  ): OrderLineItemResponse[] {
    const lineItems: OrderLineItemResponse[] = [];
    orderDetails?.lineItems?.forEach(async (lineItemEntity) => {
      if (
        lineItemEntity.cartLineItem.productType.name.toLowerCase() ===
        ProductTypes.SAREE
      ) {
        const sareeRepository: Repository<SareeEntity> =
          this.dataSource.getRepository(SareeEntity);
        const saree: SareeEntity = await sareeRepository.findOneBy({
          id: lineItemEntity.cartLineItem.productId,
        });
        //construct each cartLineitem response
        const cartLineItemResponse: OrderLineItemResponse =
          new OrderLineItemResponse();
        Object.assign(cartLineItemResponse, lineItemEntity);
        cartLineItemResponse.productId = lineItemEntity.cartLineItem.productId;
        cartLineItemResponse.productTypeId =
          lineItemEntity.cartLineItem.productType.id;
        cartLineItemResponse.productName = saree.productName;
        cartLineItemResponse.productThumbnail =
          saree?.productImages[0]?.imageSource;
        cartLineItemResponse.actualPrice =
          saree.actualprice + 2 * saree.actualprice * 0.12;
        cartLineItemResponse.offerPrice =
          saree.offerprice + 2 * saree.offerprice * 0.12;
        cartLineItemResponse.quantity = lineItemEntity.cartLineItem.quantity;
        cartLineItemResponse.finalTotalPrice = lineItemEntity.totalFinalPrice;
        cartLineItemResponse.totalSgst = lineItemEntity.totalSgst;
        cartLineItemResponse.totalCgst = lineItemEntity.totalCgst;
        lineItems.push(cartLineItemResponse);
      }
    });
    return lineItems;
  }

  public async convertToOrderResponse(
    cartDetailsEntity: OrderDetailsEntity,
  ): Promise<OrderResponse> {
    const cartDetailsResponse: OrderResponse = new OrderResponse();
    cartDetailsResponse.cartId = cartDetailsEntity.cartDetails.id;
    cartDetailsResponse.userId = cartDetailsEntity.cartDetails.userDetails.id;
    cartDetailsResponse.cartLineItems =
      this.convertLineItemResponse(cartDetailsEntity);
    cartDetailsResponse.totalActualPrice = cartDetailsEntity.totalActualPrice;
    cartDetailsResponse.totalFinalPrice = cartDetailsEntity.totalPrice;
    cartDetailsResponse.totalCgst = cartDetailsEntity.totalCgst;
    cartDetailsResponse.totalSgst = cartDetailsEntity.totalCgst;
    cartDetailsResponse.OrderStatus = cartDetailsEntity.orderstatus;
    cartDetailsResponse.orderType = cartDetailsEntity.ordertype;
    cartDetailsResponse.orderCancellationType =
      cartDetailsEntity.orderCancellationType
        ? cartDetailsEntity.orderCancellationType
        : '';
    cartDetailsResponse.orderCancellationReason =
      cartDetailsEntity.cancellation_reason;
    return cartDetailsResponse;
  }
}
