import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CartDetailsEntity } from './cart-details.entity';
import { Exclude } from 'class-transformer';
import { ProductTypeEntity } from 'src/product/product-type/entities/product-type.entity';
import { BaseEntity } from 'src/common';

@Entity('cart_line_item')
export class CartLineItemEntity extends BaseEntity {
  @Exclude({ toPlainOnly: true })
  @Column({ name: 'product_id' })
  productId: string;
  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => ProductTypeEntity, { eager: true })
  @JoinColumn({ name: 'product_type_id' })
  productType: ProductTypeEntity;
  @ManyToOne(() => CartDetailsEntity, (cartEntity) => cartEntity.lineItems)
  @JoinColumn({ name: 'cart_details_id' })
  cartDetails: CartDetailsEntity;
  @Column({ name: 'quantity', type: 'numeric' })
  quantity: number;
}
