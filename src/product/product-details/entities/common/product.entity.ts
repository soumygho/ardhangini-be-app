import { BaseEntity } from '../../../../common';
import { ManufacturerEntity } from '../../../manufacturer/entities/manufacturer.entity';
import { CategoryEntity } from '../../../category/entities/category.entity';
import { ProductTypeEntity } from '../../../product-type/entities/product-type.entity';
import { SubcategoryEntity } from '../../../subcategory/entities/subcategory.entity';
import { Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PromoDetailsEntity } from 'src/product/promo/entity/promo-details.entity';

export abstract class ProductEntity extends BaseEntity {
  @ApiProperty()
  @ManyToOne(() => CategoryEntity, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
  @ApiProperty()
  @ManyToOne(() => SubcategoryEntity, { eager: true })
  @JoinColumn({ name: 'subcategory_id' })
  subCategory: SubcategoryEntity;
  @ApiProperty()
  @ManyToOne(() => ProductTypeEntity, { eager: true })
  @JoinColumn({ name: 'producttype_id' })
  productType: ProductTypeEntity;
  @ApiProperty()
  @ManyToOne(() => ManufacturerEntity, { eager: true })
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: ManufacturerEntity;
  @ApiProperty()
  @Column({ type: 'varchar' })
  skuid: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  productName: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  productDescription: string;
  @ApiProperty()
  @Column({ type: 'numeric' })
  averageReview: number;
  @ApiProperty()
  @Column({ type: 'int' })
  numberOfReviews: number;
  @ApiProperty()
  @Column({ type: 'numeric' })
  offerprice: number;
  @ApiProperty()
  @Column({ type: 'numeric' })
  actualprice: number;
  @ApiProperty()
  @Column({ type: 'int' })
  available_qty: number;
  @ApiProperty()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
  @ApiProperty()
  @Column({ name: 'return_exchange_policy', type: 'varchar' })
  returnExchangePolicy: string;
  @ApiProperty()
  @Column({ type: 'numeric' })
  cgst: number;
  @ApiProperty()
  @Column({ type: 'numeric' })
  sgst: number;
  @ApiProperty()
  @Column({ name: 'is_new', nullable: true, default: false })
  isNew: boolean;
  @ApiProperty()
  @Column({ name: 'is_trending', nullable: true, default: false })
  isTrending: boolean;
  @ApiProperty()
  @Column({ name: 'is_best_seller', nullable: true, default: false })
  isBestSeller: boolean;
  @ApiProperty()
  @Column({ name: 'max_quantity_per_cart', default: 3, type: 'numeric' })
  maxQuantityPerCart: number;

  @ApiProperty()
  @OneToOne(() => PromoDetailsEntity, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'promo_details_id' })
  promoDetails: PromoDetailsEntity;
}
