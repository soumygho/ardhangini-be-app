import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common';
import { CartLineItemEntity } from 'src/product/cart/entity/cart-line-item.entity';
import { OrderDetailsEntity } from './order.entity';

@Entity('order_line_items')
export class OrderLineItemEntity extends BaseEntity {
  @ManyToOne(() => OrderDetailsEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  orderDetails: OrderDetailsEntity;
  @OneToOne(() => CartLineItemEntity)
  @JoinColumn({ name: 'cart_line_item_id' })
  cartLineItem: CartLineItemEntity;
  @Column({ type: 'numeric' })
  perItemActualPrice: number;
  @Column({ type: 'numeric' })
  perItemOfferPrice: number;
  @Column({ type: 'numeric' })
  perItemFinalPrice: number;
  @Column({ type: 'numeric' })
  totalActualPrice: number;
  @Column({ type: 'numeric' })
  totalOfferPrice: number;
  @Column({ type: 'numeric' })
  sgstPerItem: number;
  @Column({ type: 'numeric' })
  cgstPerItem: number;
  @Column({ type: 'numeric' })
  totalSgst: number;
  @Column({ type: 'numeric' })
  totalCgst: number;
  @Column({ type: 'varchar', nullable: true })
  promoDescription: string;
  @Column({ type: 'numeric', default: 0, nullable: true })
  promoDiscountPerItem: number;
  @Column({ type: 'numeric', default: 0, nullable: true })
  totalPromoDiscount: number;
  @Column({ type: 'numeric' })
  totalFinalPrice: number;
}
