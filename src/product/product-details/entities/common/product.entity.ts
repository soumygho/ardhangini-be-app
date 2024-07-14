import { Base } from '../../../../common';
import { Manufacturer } from '../../../manufacturer/entities/manufacturer.entity';
import { Category } from '../../../category/entities/category.entity';
import { ProductType } from '../../../product-type/entities/product-type.entity';
import { Subcategory } from '../../../subcategory/entities/subcategory.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export abstract class Product extends Base {
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
  @ManyToOne(() => Subcategory)
  @JoinColumn({ name: 'subcategory_id' })
  subCategory: Subcategory;
  @ManyToOne(() => ProductType)
  @JoinColumn({ name: 'producttype_id' })
  productType: ProductType;
  @ManyToOne(() => Manufacturer)
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: Manufacturer;

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
