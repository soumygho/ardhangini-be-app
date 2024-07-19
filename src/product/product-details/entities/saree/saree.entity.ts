import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ProductEntity } from '../common/product.entity';
import { SareeDetailsEntity } from './saree-details.entity';
import { SareeImageEntity } from './saree-images.entity';

@Entity('saree')
export class SareeEntity extends ProductEntity {
  @OneToOne(() => SareeDetailsEntity, {
    nullable: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'saree_details_id' })
  sareeDetails: SareeDetailsEntity;

  @OneToMany(() => SareeImageEntity, (sareeImage) => sareeImage.product, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: true,
  })
  productImages: SareeImageEntity[];
}
