import { Base } from '../../../../common';
import { Manufacturer } from '../../../manufacturer/entities/manufacturer.entity';
import { Category } from '../../../category/entities/category.entity';
import { ProductType } from '../../../product-type/entities/product-type.entity';
import { Subcategory } from '../../../subcategory/entities/subcategory.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

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

  skuid: string;
  productName: string;
  productDescription: string;
  averageReview: number;
  numberOfReviews: number;
  offerprice: number;
  actualprice: number;
  discountPercentage: number;
  available_qty: number;
  isActive: boolean;
}