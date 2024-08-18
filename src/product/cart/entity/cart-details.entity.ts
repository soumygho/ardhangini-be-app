import { BaseEntity } from 'src/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CartLineItemEntity } from './cart-line-item.entity';
@Entity('cart_details')
export class CartDetailsEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id' })
  userDetails: UserEntity;
  @OneToMany(
    () => CartLineItemEntity,
    (cartLineItemEntity) => cartLineItemEntity.cartDetails,
    { eager: true, nullable: true, onDelete: 'CASCADE' },
  )
  lineItems: CartLineItemEntity[];
  @Column({ name: 'is_ordered', type: 'boolean', default: false })
  isOrdered: boolean;
}
