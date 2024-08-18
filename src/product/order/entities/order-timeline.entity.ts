import { BaseEntity } from 'src/common';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OrderEvent } from '../enum/order-event.enum';
import { OrderDetailsEntity } from './order.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('order_timeline')
export class OrderTimeLineEntity extends BaseEntity {
  @ApiProperty()
  @Column({ name: 'event_date', type: 'varchar' })
  eventDate: string;
  @ApiProperty()
  @Column({ enum: OrderEvent, default: OrderEvent.PENDINGFORPROCESSING })
  eventType: OrderEvent;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  description: string;
  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => OrderDetailsEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  orderDetails: OrderDetailsEntity;
}
