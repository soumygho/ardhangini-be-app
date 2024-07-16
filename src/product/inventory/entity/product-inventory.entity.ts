import { BaseEntity } from 'src/common';
import { OrderDetailsEntity } from 'src/product/order/entities/order.entity';
import { ProductEntity } from 'src/product/product-details';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TransactionType } from '../enum/transaction-type.enum';

@Entity()
export class ProductInventoryEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  invoiceref: string;
  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
  @Column({ type: 'numeric' })
  quantity: number;

  @ManyToOne(() => OrderDetailsEntity, { nullable: true })
  @JoinColumn({ name: 'order_id' })
  order: OrderDetailsEntity;

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
