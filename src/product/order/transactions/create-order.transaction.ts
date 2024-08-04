//validate cart
//copy delivery address
//check promo
//pull data from promo and save to order_promo_table
//insert into payment repo
//modify cart as isOrder to true

import { BaseTransaction } from 'src/common/entity/BaseTransaction';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderResponse } from '../dto/order-response.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { CartDetailsEntity } from 'src/product/cart/entity/cart-details.entity';
import { PromoDetailsEntity } from 'src/product/promo/entity/promo-details.entity';
import { SareeEntity } from 'src/product/product-details';
import { OrderLineItemEntity } from '../entities/order-line-item.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { OrderDetailsEntity } from '../entities/order.entity';
import { OrderStatus, OrderType } from '../enum/order.enum';
import { PaymentEntity } from 'src/product/payment/entity/payment.entity';
import { PaymentStatus } from 'src/product/payment/enum/payment-status.enum';
import { OrderTimeLineEntity } from '../entities/order-timeline.entity';
import { OrderEvent } from '../enum/order-event.enum';
import { OrderDetailsMapper } from '../mapper/order-details.mapper';

//save order to repo
export class CreateOrderTransaction extends BaseTransaction<
  CreateOrderDto,
  OrderResponse
> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mapper: OrderDetailsMapper,
  ) {
    super(dataSource);
  }
  protected async execute(
    data: CreateOrderDto,
    manager: EntityManager,
  ): Promise<OrderResponse> {
    const userRepository: Repository<UserEntity> =
      manager.getRepository(UserEntity);
    const cartRepository: Repository<CartDetailsEntity> =
      manager.getRepository(CartDetailsEntity);
    const promoRepository: Repository<PromoDetailsEntity> =
      manager.getRepository(PromoDetailsEntity);
    const sareeRepository: Repository<SareeEntity> =
      manager.getRepository(SareeEntity);
    const orderLineRepository: Repository<OrderLineItemEntity> =
      manager.getRepository(OrderLineItemEntity);
    const orderDetailsRepository: Repository<OrderDetailsEntity> =
      manager.getRepository(OrderDetailsEntity);
    const paymentRepository: Repository<PaymentEntity> =
      manager.getRepository(PaymentEntity);
    const orderTimeLineRepository: Repository<OrderTimeLineEntity> =
      manager.getRepository(OrderTimeLineEntity);

    if (!(await userRepository.existsBy({ id: data.userId }))) {
      throw new NotFoundException('user not found');
    }
    if (
      !(await cartRepository.existsBy({ id: data.cartId, isOrdered: false }))
    ) {
      throw new NotFoundException('Cart not found.');
    }
    const userEntity: UserEntity = await userRepository.findOneBy({
      id: data.userId,
    });
    const cartDetails: CartDetailsEntity = await cartRepository.findOneBy({
      id: data.cartId,
      isOrdered: false,
    });
    if (!cartDetails) {
      throw new NotFoundException('Cart not found');
    }

    const orderLineItems: OrderLineItemEntity[] = [];
    let totalCartValue: number = 0;
    let totalCartActualPrice: number = 0;
    let totalPromoDiscount: number = 0;
    let totalFinalPrice: number = 0;

    //line item processing logic here
    cartDetails.lineItems.forEach(async (cartlineItem) => {
      const orderLineItem: OrderLineItemEntity = orderLineRepository.create();
      const sareeEntity: SareeEntity = await sareeRepository.findOneBy({
        id: cartlineItem.productId,
      });

      //validation for each order line here
      if (cartlineItem.quantity > sareeEntity.available_qty) {
        throw new ConflictException(
          `${sareeEntity.productName} is out of stock`,
        );
      }
      if (cartlineItem.quantity > sareeEntity.maxQuantityPerCart) {
        throw new ConflictException(
          `${sareeEntity.productName} max quantity allowed per cart is ${sareeEntity.maxQuantityPerCart}`,
        );
      }

      orderLineItem.cartLineItem = cartlineItem;
      orderLineItem.perItemActualPrice = sareeEntity.actualprice;
      orderLineItem.perItemOfferPrice = sareeEntity.offerprice;
      orderLineItem.perItemFinalPrice = orderLineItem.perItemOfferPrice;
      orderLineItem.totalActualPrice =
        sareeEntity.actualprice * cartlineItem.quantity;
      orderLineItem.totalFinalPrice = 0;

      totalCartActualPrice +=
        orderLineItem.perItemActualPrice * cartlineItem.quantity;
      totalCartValue += orderLineItem.perItemOfferPrice * cartlineItem.quantity;
      orderLineItems.push(orderLineItem);
    });
    //Promo handling logics here
    orderLineItems.forEach(async (orderLineItem) => {
      const sareeEntity: SareeEntity = await sareeRepository.findOneBy({
        id: orderLineItem.cartLineItem.productId,
      });
      if (
        sareeEntity.promoDetails &&
        totalCartValue >= sareeEntity.promoDetails.minimumOrderValue
      ) {
        if (sareeEntity.promoDetails.discountPercentage > 0) {
          orderLineItem.promoDiscountPerItem =
            (orderLineItem.perItemOfferPrice *
              sareeEntity.promoDetails.discountPercentage) /
            100;
        } else if (sareeEntity.promoDetails.flatDiscount > 0) {
          orderLineItem.promoDiscountPerItem =
            sareeEntity.promoDetails.flatDiscount;
        }
        orderLineItem.perItemFinalPrice =
          orderLineItem.perItemOfferPrice - orderLineItem.promoDiscountPerItem;
        orderLineItem.cgstPerItem = orderLineItem.perItemFinalPrice * 0.12;
        orderLineItem.sgstPerItem = orderLineItem.perItemFinalPrice * 0.12;
        orderLineItem.totalFinalPrice =
          orderLineItem.perItemFinalPrice * orderLineItem.cartLineItem.quantity;
        orderLineItem.promoDescription = sareeEntity.promoDetails.description;
        totalPromoDiscount +=
          orderLineItem.promoDiscountPerItem *
          orderLineItem.cartLineItem.quantity;
        totalFinalPrice += orderLineItem.totalFinalPrice;
      }
    });

    let orderDetailsEntity: OrderDetailsEntity =
      orderDetailsRepository.create();
    orderDetailsEntity.cartDetails = cartDetails;
    orderDetailsEntity.orderid =
      'OD-' + userEntity.mobile + Math.random().toString(4);
    orderDetailsEntity.user = userEntity;
    orderDetailsEntity.orderstatus = OrderStatus.PENDING;
    orderDetailsEntity.ordertype = data.orderType;
    orderDetailsEntity.totalCgst = totalFinalPrice * 0.12;
    orderDetailsEntity.totalCgst = totalFinalPrice * 0.12;
    orderDetailsEntity.totalPrice =
      totalFinalPrice + orderDetailsEntity.totalCgst * 2;
    orderDetailsEntity.totalActualPrice = totalCartActualPrice;
    orderDetailsEntity = await orderDetailsRepository.save(orderDetailsEntity);

    //save the order line items to db
    orderLineItems.forEach(async (orderLineItem) => {
      orderLineItem.orderDetails = orderDetailsEntity;
      await orderLineRepository.save(orderLineItem);
    });

    //make the cart updated to ordered status
    cartDetails.isOrdered = true;
    await cartRepository.save(cartDetails);
    //update order timeline
    let orderTimeLineEntity: OrderTimeLineEntity =
      orderTimeLineRepository.create();
    orderTimeLineEntity.eventDate = new Date().toLocaleString();
    orderTimeLineEntity.eventType = OrderEvent.ORDERCREATED;
    orderTimeLineEntity.orderDetails = orderDetailsEntity;
    await orderTimeLineRepository.save(orderTimeLineEntity);

    if (orderDetailsEntity.ordertype === OrderType.COD) {
      orderTimeLineEntity = orderTimeLineRepository.create();
      orderTimeLineEntity.eventDate = new Date().toLocaleString();
      orderTimeLineEntity.eventType = OrderEvent.PENDINGFORPROCESSING;
      orderTimeLineEntity.orderDetails = orderDetailsEntity;
      await orderTimeLineRepository.save(orderTimeLineEntity);
    }

    //add payment details
    //here we need to make a call to payment getway to create an order for online payment
    let paymentEntity: PaymentEntity = paymentRepository.create();
    paymentEntity.userDetails = userEntity;
    paymentEntity.paymentMethod = data.paymentMethod;
    paymentEntity.paymentStatus = PaymentStatus.PENDING;
    paymentEntity.totalAmount = orderDetailsEntity.totalPrice;
    paymentEntity.orderDetails = orderDetailsEntity;
    paymentEntity = await paymentRepository.save(paymentEntity);

    orderDetailsEntity.paymentDetails = paymentEntity;
    orderDetailsEntity = await orderDetailsRepository.save(orderDetailsEntity);
    return this.mapper.convertToOrderResponse(orderDetailsEntity);
  }
}
