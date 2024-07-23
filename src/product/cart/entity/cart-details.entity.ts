import { BaseEntity } from 'src/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CartLineItemEntity } from './cart-line-item.entity';
@Entity('cart_details')
export class CartDetailsEntity extends BaseEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userDetails: UserEntity;
  @OneToMany(
    () => CartLineItemEntity,
    (cartLineItemEntity) => cartLineItemEntity.cartDetails,
    { eager: true, nullable: true },
  )
  lineItems: CartLineItemEntity[];
  @Column({ type: 'boolean', default: false })
  isOrdered: boolean;
}
