import { SareeEntity } from 'src/product/product-details';
import { DataSource, Repository } from 'typeorm';
import {
  OrderLineItemResponse,
  OrderResponse,
} from '../dto/order-response.dto';
import { OrderDetailsEntity } from '../entities/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderLineItemEntity } from '../entities/order-line-item.entity';
import { PaymentEntity } from 'src/product/payment/entity/payment.entity';
import { OrderTimeLineEntity } from '../entities/order-timeline.entity';

@Injectable()
export class OrderDetailsMapper {
  constructor(private readonly dataSource: DataSource) {}
  public async convertLineItemResponse(
    orderDetails: OrderDetailsEntity,
  ): Promise<OrderLineItemResponse[]> {
    const lineItems: OrderLineItemResponse[] = [];
    // const lineItemEntities: OrderLineItemEntity[] = [];
    await Promise.all(
      orderDetails?.lineItems?.map(async (lineItemEntity) => {
        //we need to check for product type and then choose correct repository when need to support multiple types of product
        //we can get product type data from cartlineitementity by id
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
        cartLineItemResponse.productTypeId = saree.productType.id;
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
      }),
    );
    return lineItems;
  }

  public async convertToOrderResponse(
    cartDetailsEntity: OrderDetailsEntity,
  ): Promise<OrderResponse> {
    console.trace(cartDetailsEntity);
    const orderTimeLines = await this.dataSource
      .getRepository(OrderTimeLineEntity)
      .createQueryBuilder()
      .andWhere('order_id = :orderId', { orderId: cartDetailsEntity.id })
      .getMany();
    const orderEntity = await this.dataSource
      .getRepository(OrderDetailsEntity)
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.cartDetails', 'cart')
      .andWhere('order.id = :orderId', { orderId: cartDetailsEntity.id })
      .getOne();
    console.trace(orderEntity);
    const paymentEntity = await this.dataSource
      .getRepository(PaymentEntity)
      .createQueryBuilder()
      .andWhere('order_id = :orderId', { orderId: cartDetailsEntity.id })
      .getOne();
    const lineItemEntities = await this.dataSource
      .getRepository(OrderLineItemEntity)
      .createQueryBuilder('lineItem')
      .leftJoinAndSelect('lineItem.cartLineItem', 'cartLineItem')
      .andWhere('order_id = :orderId', { orderId: cartDetailsEntity.id })
      .getMany();
    console.trace(paymentEntity);
    console.trace(lineItemEntities);
    orderEntity.lineItems = lineItemEntities;
    orderEntity.paymentDetails = paymentEntity;

    const cartDetailsResponse: OrderResponse = new OrderResponse();
    cartDetailsResponse.cartId = orderEntity.cartDetails.id;
    cartDetailsResponse.userId = orderEntity.user.id;
    cartDetailsResponse.cartLineItems =
      await this.convertLineItemResponse(orderEntity);
    cartDetailsResponse.totalActualPrice = orderEntity.totalActualPrice;
    cartDetailsResponse.totalFinalPrice = orderEntity.totalPrice;
    cartDetailsResponse.totalCgst = orderEntity.totalCgst;
    cartDetailsResponse.totalSgst = orderEntity.totalCgst;
    cartDetailsResponse.OrderStatus = orderEntity.orderstatus;
    cartDetailsResponse.orderType = orderEntity.ordertype;
    cartDetailsResponse.orderCancellationType =
      orderEntity.orderCancellationType
        ? orderEntity.orderCancellationType
        : '';
    cartDetailsResponse.orderCancellationReason =
      orderEntity.cancellation_reason;
    cartDetailsResponse.paymentInfo = orderEntity.paymentDetails;
    cartDetailsResponse.orderTimeLine = orderTimeLines;
    cartDetailsResponse.orderId = orderEntity.orderid;
    cartDetailsResponse.billingAddress = orderEntity.billingAddress;
    cartDetailsResponse.shippingAddress = orderEntity.shippingAddress;
    return cartDetailsResponse;
  }
}
