import { BaseEntity } from 'src/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { WishListLineItemEntity } from './wishlist-item.entity';

@Entity('wishlist')
export class WishListEntity extends BaseEntity {
  @OneToOne(() => UserEntity, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  @OneToMany(() => WishListLineItemEntity, (object) => object.wishListDetails, {
    nullable: true,
    eager: true,
  })
  lineItems: WishListLineItemEntity[];
}
