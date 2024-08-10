import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ProductEntity } from '../common/product.entity';
import { SareeDetailsEntity } from './saree-details.entity';
import { SareeImageEntity } from './saree-images.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCollectionEntity } from 'src/product/collections/entity/product-collection.entity';
import { ProductColorEntity } from 'src/product/colours/entity/product-colour.entity';
import { ProductPrintsEntity } from 'src/product/prints/entity/product-prints.entity';
import { ProductOccassionEntity } from 'src/product/product-occasion/entity/product-occassion.entity';
import { ProductStyleEntity } from 'src/product/product-style/entity/product-style.entity';

@Entity('saree')
export class SareeEntity extends ProductEntity {
  @ApiProperty({ type: () => SareeDetailsEntity })
  @OneToOne(() => SareeDetailsEntity, {
    nullable: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'saree_details_id' })
  sareeDetails: SareeDetailsEntity;

  @ApiProperty({ isArray: true, type: SareeImageEntity })
  @OneToMany(() => SareeImageEntity, (sareeImage) => sareeImage.product, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: true,
  })
  productImages: SareeImageEntity[];

  @ApiProperty({ type: ProductCollectionEntity })
  @ManyToOne(() => ProductCollectionEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'collection_id' })
  collection: ProductCollectionEntity;
  @ApiProperty({ type: ProductColorEntity })
  @ManyToOne(() => ProductColorEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'color_id' })
  colour: ProductColorEntity;
  @ApiProperty({ type: ProductPrintsEntity })
  @ManyToOne(() => ProductPrintsEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'print_id' })
  print: ProductPrintsEntity;
  @ApiProperty({ type: ProductOccassionEntity })
  @ManyToOne(() => ProductOccassionEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'occassion_id' })
  occassion: ProductOccassionEntity;
  @ApiProperty({ type: ProductStyleEntity })
  @ManyToOne(() => ProductStyleEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'style_id' })
  style: ProductStyleEntity;
}
