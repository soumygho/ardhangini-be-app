import { BaseEntity } from '../../../../common';
import { ManufacturerEntity } from '../../../manufacturer/entities/manufacturer.entity';
import { CategoryEntity } from '../../../category/entities/category.entity';
import { ProductTypeEntity } from '../../../product-type/entities/product-type.entity';
import { SubcategoryEntity } from '../../../subcategory/entities/subcategory.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export abstract class ProductEntity extends BaseEntity {
  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
  @ManyToOne(() => SubcategoryEntity)
  @JoinColumn({ name: 'subcategory_id' })
  subCategory: SubcategoryEntity;
  @ManyToOne(() => ProductTypeEntity)
  @JoinColumn({ name: 'producttype_id' })
  productType: ProductTypeEntity;
  @ManyToOne(() => ManufacturerEntity)
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: ManufacturerEntity;

  @Column({ type: 'varchar' })
  skuid: string;
  @Column({ type: 'varchar' })
  productName: string;
  @Column({ type: 'varchar' })
  productDescription: string;
  @Column({ type: 'numeric' })
  averageReview: number;
  @Column({ type: 'int' })
  numberOfReviews: number;
  @Column({ type: 'numeric' })
  offerprice: number;
  @Column({ type: 'numeric' })
  actualprice: number;
  @Column({ type: 'numeric' })
  discountPercentage: number;
  @Column({ type: 'int' })
  available_qty: number;
  @Column({ type: 'boolean' })
  isActive: boolean;
}
