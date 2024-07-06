import { Column, JoinColumn, OneToOne } from 'typeorm';
import { Product } from './product.entity';
import { Base } from 'src/category/entities/base.entity';

export abstract class ProductDetails extends Base {
  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
  @Column({ name: 'is_best_seller' })
  isBestSeller: boolean;
}