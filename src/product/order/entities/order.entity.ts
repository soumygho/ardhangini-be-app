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

@Entity('order_details')
export class OrderDetailsEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => PaymentEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'payment_id' })
  paymentDetails: PaymentEntity;

  @OneToMany(() => OrderLineItemEntity, (lineItem) => lineItem.orderDetails, {
    eager: true,
    nullable: true,
  })
  lineItems: OrderLineItemEntity[];

  @OneToOne(() => CartDetailsEntity, { eager: true })
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
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  orderstatus: OrderStatus;

  @Column({
    type: 'varchar',
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
  totalIgst: number;

  @Column({ type: 'numeric' })
  totalCgst: number;
}
