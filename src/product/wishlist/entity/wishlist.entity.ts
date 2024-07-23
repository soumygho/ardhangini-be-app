import { BaseEntity } from 'src/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { WishListLineItemEntity } from './wishlist-item.entity';

@Entity('wishlist')
export class WishListEntity extends BaseEntity {
  @OneToOne(() => UserEntity)
  @Column({ name: 'user_id', type: 'varchar' })
  user: UserEntity;
  @OneToMany(() => WishListLineItemEntity, (object) => object.wishListDetails)
  lineItems: WishListLineItemEntity[];
}
