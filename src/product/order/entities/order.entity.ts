import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../../common';
import { OrderStatus, OrderType } from '../enum/order.enum';
import { UserEntity } from 'src/user/entities/user.entity';
import { PaymentEntity } from 'src/product/payment/entity/payment.entity';
import { OrderCancellationReasonType } from '../enum/order-cancellation-type.enum';
import { CartDetailsEntity } from 'src/product/cart/entity/cart-details.entity';
import { OrderLineItemEntity } from './order-line-item.entity';
import { OrderEvent } from '../enum/order-event.enum';

@Entity('order_details')
export class OrderDetailsEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => PaymentEntity, (payment) => payment.id, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'payment_id' })
  paymentDetails: PaymentEntity;

  @OneToMany(() => OrderLineItemEntity, (lineItem) => lineItem.orderDetails, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  lineItems: OrderLineItemEntity[];

  @OneToOne(() => CartDetailsEntity, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cartDetails: CartDetailsEntity;

  @Column({
    type: 'enum',
    enum: OrderCancellationReasonType,
    nullable: true,
  })
  orderCancellationType: OrderCancellationReasonType;

  @Column({
    type: 'enum',
    enum: OrderType,
    default: OrderType.COD,
  })
  ordertype: OrderType;

  @Column({
    type: 'enum',
    enum: OrderEvent,
    default: OrderEvent.ORDERCREATED,
  })
  orderstatus: OrderEvent;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  cancellation_reason: string;

  @Column({
    type: 'varchar',
  })
  orderid: string;

  @Column({ type: 'numeric' })
  totalActualPrice: number;

  @Column({ type: 'numeric' })
  totalPrice: number;

  @Column({ type: 'numeric' })
  totalSgst: number;

  @Column({ type: 'numeric' })
  totalCgst: number;
  @Column({ type: 'varchar', nullable: true })
  billingAddress: string;
  @Column({ type: 'varchar', nullable: true })
  shippingAddress: string;
}
