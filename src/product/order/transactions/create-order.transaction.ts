import { BadRequestException } from '@nestjs/common';
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
import { CartLineItemEntity } from 'src/product/cart/entity/cart-line-item.entity';
import { makeid } from '../util/order-number.util';

//save order to repo
export class CreateOrderTransaction extends BaseTransaction<
  CreateOrderDto,
  OrderDetailsEntity
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
  ): Promise<OrderDetailsEntity> {
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
      throw new BadRequestException('user not found');
    }
    const userEntity: UserEntity = await userRepository.findOneBy({
      id: data.userId,
    });
    const cartDetails: CartDetailsEntity = await cartRepository
      .createQueryBuilder()
      .andWhere('user_id = :userId', { userId: data.userId })
      .andWhere('is_ordered = :isOrdered', { isOrdered: false })
      .getOne();
    if (!cartDetails) {
      throw new BadRequestException('Cart not found');
    }
    const cartLineItems: CartLineItemEntity[] = await manager
      .getRepository(CartLineItemEntity)
      .createQueryBuilder('lineitem')
      .leftJoinAndSelect('lineitem.productType', 'producttype')
      .andWhere('cart_details_id = :cartId', {
        cartId: cartDetails.id,
      })
      .getMany();
    const orderLineItems: OrderLineItemEntity[] = [];
    let totalCartValue: number = 0;
    let totalCartActualPrice: number = 0;
    let totalPromoDiscount: number = 0;
    let totalFinalPrice: number = 0;
    let totalSgst = 0;
    let totalCgst = 0;

    //line item processing logic here
    await Promise.all(
      cartLineItems?.map(async (cartlineItem) => {
        const orderLineItem: OrderLineItemEntity = orderLineRepository.create();
        const sareeEntity: SareeEntity = await sareeRepository.findOneBy({
          id: cartlineItem.productId,
        });

        //validation for each order line here
        if (cartlineItem.quantity > sareeEntity.available_qty) {
          /* throw new BadRequestException(
          `${sareeEntity.productName} is out of stock`,
        );*/
        }
        if (cartlineItem.quantity > sareeEntity.maxQuantityPerCart) {
          throw new BadRequestException(
            `${sareeEntity.productName} max quantity allowed per cart is ${sareeEntity.maxQuantityPerCart}`,
          );
        }

        orderLineItem.cartLineItem = cartlineItem;
        orderLineItem.perItemActualPrice = Number.parseFloat(
          sareeEntity.actualprice + '',
        );
        orderLineItem.perItemOfferPrice = Number.parseFloat(
          sareeEntity.offerprice + '',
        );
        orderLineItem.totalOfferPrice =
          sareeEntity.offerprice * cartlineItem.quantity;
        orderLineItem.promoDiscountPerItem = 0;
        if (
          sareeEntity.promoDetails &&
          totalCartValue >=
            Number.parseFloat(sareeEntity.promoDetails.minimumOrderValue + '')
        ) {
          if (
            Number.parseFloat(
              sareeEntity.promoDetails.discountPercentage + '',
            ) > 0
          ) {
            orderLineItem.promoDiscountPerItem =
              (Number.parseFloat(orderLineItem.perItemOfferPrice + '') *
                Number.parseFloat(
                  sareeEntity.promoDetails.discountPercentage + '',
                )) /
              100;
          } else if (
            Number.parseFloat(sareeEntity.promoDetails.flatDiscount + '') > 0
          ) {
            orderLineItem.promoDiscountPerItem = Number.parseFloat(
              sareeEntity.promoDetails.flatDiscount + '',
            );
          }
        }
        orderLineItem.totalActualPrice =
          sareeEntity.actualprice * cartlineItem.quantity;
        orderLineItem.cgstPerItem =
          (orderLineItem.perItemOfferPrice -
            orderLineItem.promoDiscountPerItem) *
          0.12;
        orderLineItem.sgstPerItem =
          (orderLineItem.perItemOfferPrice -
            orderLineItem.promoDiscountPerItem) *
          0.12;
        orderLineItem.totalSgst =
          orderLineItem.sgstPerItem * cartlineItem.quantity;
        orderLineItem.totalCgst =
          orderLineItem.sgstPerItem * cartlineItem.quantity;
        orderLineItem.perItemFinalPrice =
          orderLineItem.perItemOfferPrice -
          orderLineItem.promoDiscountPerItem +
          2 * orderLineItem.sgstPerItem;
        orderLineItem.totalFinalPrice =
          orderLineItem.perItemFinalPrice * cartlineItem.quantity;
        orderLineItem.totalPromoDiscount =
          orderLineItem.promoDiscountPerItem * cartlineItem.quantity;
        totalCartActualPrice +=
          orderLineItem.perItemActualPrice * cartlineItem.quantity;
        totalCartValue +=
          orderLineItem.perItemFinalPrice * cartlineItem.quantity;
        totalSgst = totalSgst + orderLineItem.totalSgst;
        totalCgst = totalCgst + orderLineItem.totalCgst;
        totalPromoDiscount = orderLineItem.totalPromoDiscount;
        totalFinalPrice = totalCartValue;
        console.trace(orderLineItem);
        orderLineItems.push(orderLineItem);
      }),
    );

    let orderDetailsEntity: OrderDetailsEntity =
      orderDetailsRepository.create();
    orderDetailsEntity.cartDetails = cartDetails;
    orderDetailsEntity.billingAddress = data?.billingAddress;
    orderDetailsEntity.shippingAddress = data?.deliveryAddress;
    orderDetailsEntity.orderid = 'OD-' + makeid(5) + makeid(4);
    orderDetailsEntity.user = userEntity;
    orderDetailsEntity.orderstatus = OrderEvent.ORDERCREATED;
    orderDetailsEntity.ordertype = data.orderType;
    orderDetailsEntity.totalCgst = totalCgst;
    orderDetailsEntity.totalSgst = totalSgst;
    orderDetailsEntity.totalPrice = totalFinalPrice;
    orderDetailsEntity.totalActualPrice = totalCartActualPrice;
    console.trace(orderDetailsEntity);
    orderDetailsEntity = await orderDetailsRepository.save(orderDetailsEntity);
    //save the order line items to db
    const orderLineEntities: OrderLineItemEntity[] = [];
    await Promise.all(
      orderLineItems?.map(async (orderLineItem) => {
        orderLineItem.orderDetails = orderDetailsEntity;
        const entity = await orderLineRepository.save(orderLineItem);
        orderLineEntities.push(entity);
      }),
    );

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
    await manager
      .createQueryBuilder()
      .update(PaymentEntity)
      .set({ orderDetails: () => `'${orderDetailsEntity.id}'` })
      .where('id = :paymentId', { paymentId: paymentEntity.id })
      .execute();

    await manager
      .createQueryBuilder()
      .update(OrderDetailsEntity)
      .set({ paymentDetails: () => `'${paymentEntity.id}'` })
      .where('id = :orderId', { orderId: orderDetailsEntity.id })
      .execute();
    /*orderDetailsEntity = await orderDetailsRepository.findOneBy({
      id: orderDetailsEntity.id,
    });*/
    console.trace(orderDetailsEntity);
    //return this.mapper.convertToOrderResponse(orderDetailsEntity);
    return orderDetailsEntity;
  }
}
