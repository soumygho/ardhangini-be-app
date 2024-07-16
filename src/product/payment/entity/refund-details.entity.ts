import { BaseEntity } from 'src/common';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { PaymentEntity } from 'src/product/payment/entity/payment.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { OrderDetailsEntity } from '../../order/entities/order.entity';

@Entity('refund_details')
export class RefundEntity extends BaseEntity {
  @OneToOne(() => OrderDetailsEntity)
  @JoinColumn({ name: 'order_id' })
  orderDetails: OrderDetailsEntity;
  @OneToOne(() => PaymentEntity)
  @JoinColumn({ name: 'payment_id' })
  paymentDetails: PaymentEntity;
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userDetails: UserEntity;
  //need to add info from gateway refund api
}
