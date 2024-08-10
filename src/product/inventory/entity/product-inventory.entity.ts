import { BaseEntity } from 'src/common';
import { OrderDetailsEntity } from 'src/product/order/entities/order.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TransactionType } from '../enum/transaction-type.enum';
import { ProductTypeEntity } from 'src/product/product-type/entities/product-type.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('inventory_ledger')
export class ProductInventoryEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  invoiceref: string;
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'varchar' })
  productId: string;
  @ManyToOne(() => ProductTypeEntity, { eager: true })
  @JoinColumn({ name: 'product_type_id' })
  productType: ProductTypeEntity;
  @Column({ type: 'numeric' })
  quantity: number;
  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;

  @ManyToOne(() => OrderDetailsEntity, { nullable: true, eager: true })
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
