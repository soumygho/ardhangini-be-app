import { BaseEntity } from 'src/common';
import { OrderDetailsEntity } from 'src/product/order/entities/order.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { PaymentMethod } from '../enum/payment-method.enum';
import { PaymentStatus } from '../enum/payment-status.enum';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'payment-details' })
export class PaymentEntity extends BaseEntity {
  @Exclude({ toPlainOnly: true })
  @OneToOne(() => OrderDetailsEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  orderDetails: OrderDetailsEntity;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  @Exclude({ toPlainOnly: true })
  userDetails: UserEntity;
  @ApiProperty()
  @Column({ name: 'total_amount', type: 'numeric' })
  totalAmount: number;
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: false,
  })
  paymentMethod: PaymentMethod;
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    nullable: false,
  })
  paymentStatus: PaymentStatus;
  @ApiProperty()
  @Column({ name: 'gateway_order_id', type: 'varchar', nullable: true })
  gatewayOrderId: string;
  @ApiProperty()
  @Column({ name: 'gateway_payment_id', type: 'varchar', nullable: true })
  gatewayPaymentId: string;
  @Exclude({ toPlainOnly: true })
  @Column({ name: 'gateway_signature', type: 'varchar', nullable: true })
  gatewaySignature: string;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  failureReason: string;
}
