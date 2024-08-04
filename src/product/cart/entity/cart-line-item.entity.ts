import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CartDetailsEntity } from './cart-details.entity';
import { Exclude } from 'class-transformer';
import { ProductTypeEntity } from 'src/product/product-type/entities/product-type.entity';
import { BaseEntity } from 'src/common';

@Entity('cart_line_item')
export class CartLineItemEntity extends BaseEntity {
  @Exclude({ toPlainOnly: true })
  productId: string;
  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => ProductTypeEntity)
  productType: ProductTypeEntity;
  @ManyToOne(() => CartDetailsEntity, (cartEntity) => cartEntity.lineItems)
  @JoinColumn({ name: 'cart_details_id' })
  cartDetails: CartDetailsEntity;
  @Column({ type: 'int' })
  quantity: number;
}
