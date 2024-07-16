import { ProductEntity } from 'src/product/product-details';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { CartDetailsEntity } from './cart-details.entity';

@Entity('cart_line_item')
export class CartLineItemEntity extends BaseEntity {
  @ManyToMany(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  productDetails: ProductEntity;
  @ManyToOne(() => CartDetailsEntity, (cartEntity) => cartEntity.lineItems)
  @JoinColumn({ name: 'cart_details_id' })
  cartDetails: CartDetailsEntity;
  @Column({ type: 'int' })
  quantity: number;
}
