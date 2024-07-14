import { Base } from 'src/common';
import { Order } from 'src/product/order/entities/order.entity';
import { Product } from 'src/product/product-details';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TransactionType } from '../enum/transaction-type.enum';

@Entity()
export class ProductInventoryEntity extends Base {
  @Column({ type: 'varchar', nullable: true })
  invoiceref: string;
  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
  @Column({ type: 'numeric' })
  quantity: number;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({
    type: 'enum',
    enum: TransactionType,
    nullable: false,
  })
  transactionType: TransactionType;

  @Column({ type: 'numeric', nullable: false })
  opening: number;
  @Column({ type: 'numeric', nullable: false })
  closing: number;
}
