import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '../../../common';
import { Order } from './order.entity';
import { Product } from 'src/product/product-details/entities/common/product.entity';

@Entity()
export class OrderDetails extends Base {
  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
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
