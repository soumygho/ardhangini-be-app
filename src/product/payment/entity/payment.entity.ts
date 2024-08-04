import { BaseEntity } from 'src/common';
import { OrderDetailsEntity } from 'src/product/order/entities/order.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { PaymentMethod } from '../enum/payment-method.enum';
import { PaymentStatus } from '../enum/payment-status.enum';

@Entity({ name: 'payment-details' })
export class PaymentEntity extends BaseEntity {
  @OneToOne(() => OrderDetailsEntity)
  @JoinColumn({ name: 'order_id' })
  orderDetails: OrderDetailsEntity;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userDetails: UserEntity;
  @Column({ name: 'total_amount', type: 'numeric' })
  totalAmount: number;
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: false,
  })
  paymentMethod: PaymentMethod;
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    nullable: false,
  })
  paymentStatus: PaymentStatus;
  @Column({ name: 'gateway_order_id', type: 'varchar', nullable: true })
  gatewayOrderId: string;
  @Column({ name: 'gateway_payment_id', type: 'varchar', nullable: true })
  gatewayPaymentId: string;
  @Column({ name: 'gateway_signature', type: 'varchar', nullable: true })
  gatewaySignature: string;
  @Column({ type: 'varchar', nullable: true })
  failureReason: string;
}
