import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common';
import { OrderDetailsEntity } from './order.entity';
import { Exclude } from 'class-transformer';

@Entity('order_line_items')
export class OrderLineItemEntity extends BaseEntity {
  @ManyToOne(() => OrderDetailsEntity)
  @JoinColumn({ name: 'order_id' })
  orderDetails: OrderDetailsEntity;

  @Exclude({ toPlainOnly: true })
  productTypeId: string;
  @Exclude({ toPlainOnly: true })
  productId: string;

  @Column({ type: 'int' })
  orderQty: number;
  @Column({ type: 'numeric' })
  listedPricePerItem: number;
  @Column({ type: 'numeric' })
  offerPrice: number;
  @Column({ type: 'numeric' })
  totallistedPrice: number;
  @Column({ type: 'numeric' })
  totalofferPrice: number;
  @Column({ type: 'numeric' })
  shippingCharge: number;
  @Column({ type: 'numeric' })
  sgst: number;
  @Column({ type: 'numeric' })
  cgst: number;
}
