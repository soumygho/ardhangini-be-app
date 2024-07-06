import { Base } from 'src/category/entities/base.entity';
import { Product } from './product.entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { ImageType } from '../enums/product.enum';

export class ProductImage extends Base {
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
  description: string;
  source: string;
  tumbnailSource: string;
  @Column({
    type: 'enum',
    enum: ImageType,
    default: ImageType.PRODUCT,
  })
  imageType: ImageType;
}
