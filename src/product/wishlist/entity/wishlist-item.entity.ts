import { BaseEntity } from 'src/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { WishListEntity } from './wishlist.entity';
import { Exclude } from 'class-transformer';
import { ProductTypeEntity } from 'src/product/product-type/entities/product-type.entity';

@Entity('wishlist-items')
export class WishListLineItemEntity extends BaseEntity {
  @ManyToOne(() => WishListEntity, (wishListEntity) => wishListEntity.lineItems)
  @Column({ name: 'wishlist_id', type: 'varchar' })
  wishListDetails: WishListEntity;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'product_id', type: 'varchar' })
  productId: string;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => ProductTypeEntity)
  productType: ProductTypeEntity;
}
