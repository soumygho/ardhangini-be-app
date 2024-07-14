import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '../../../common';
import { OrderStatus, OrderType } from '../enum/order.enum';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Order extends Base {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('payment_id')
  paymentid: string;
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
