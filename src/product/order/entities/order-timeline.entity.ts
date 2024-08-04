import { BaseEntity } from 'src/common';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrderEvent } from '../enum/order-event.enum';
import { OrderDetailsEntity } from './order.entity';

@Entity('order_timeline')
export class OrderTimeLineEntity extends BaseEntity {
  @Column({ name: 'event_date', type: 'varchar' })
  eventDate: string;
  @Column({ enum: OrderEvent, default: OrderEvent.PENDINGFORPROCESSING })
  eventType: OrderEvent;
  @Column({ type: 'varchar' })
  description: string;
  @ManyToOne(() => OrderDetailsEntity)
  @JoinColumn({ name: 'order_id' })
  orderDetails: OrderDetailsEntity;
}
