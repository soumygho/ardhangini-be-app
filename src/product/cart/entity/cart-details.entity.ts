import { BaseEntity } from 'src/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CartLineItemEntity } from './cart-line-item.entity';

export class CartDetailsEntity extends BaseEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userDetails: UserEntity;
  @OneToMany(
    () => CartLineItemEntity,
    (cartLineItemEntity) => cartLineItemEntity.cartDetails,
  )
  lineItems: CartLineItemEntity[];
}
