import { BaseEntity } from '../../../../common';
import { ProductEntity } from './product.entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { ImageType } from '../../enum/product.enum';

export class ProductImage extends BaseEntity {
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
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
