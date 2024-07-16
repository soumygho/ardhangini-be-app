import { Column, JoinColumn, OneToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { BaseEntity } from '../../../../common';

export abstract class ProductDetailsEntity extends BaseEntity {
  @OneToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
  @Column({ name: 'is_best_seller' })
  isBestSeller: boolean;
}
