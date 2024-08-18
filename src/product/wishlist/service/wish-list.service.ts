import { DataSource, Repository } from 'typeorm';
import { WishListUpdateDto } from '../dto/wishlist-update.dto';
import { AddOrUpdateWishListTransaction } from '../transaction/add-update-wishlist.transaction';
import { WishListResponseMapper } from '../util/wishlist-response.mapper';
import { UserEntity } from 'src/user/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { WishListEntity } from '../entity/wishlist.entity';
import { WishListLineItemEntity } from '../entity/wishlist-item.entity';

@Injectable()
export class WishListService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly transaction: AddOrUpdateWishListTransaction,
    private readonly mapper: WishListResponseMapper,
  ) {}

  async addOrUpdateWishList(dto: WishListUpdateDto) {
    const wishListEntity = await this.transaction.run(dto);
    return await this.mapper.convertToWishListResponse(wishListEntity);
  }

  private async getWishListDetails(userId: string) {
    const userEntity: UserEntity = await this.getUser(userId);
    const wishListRepository: Repository<WishListEntity> =
      this.dataSource.getRepository(WishListEntity);
    let wishListEntity: WishListEntity = await wishListRepository
      .createQueryBuilder()
      .andWhere('user_id = :userId', { userId: userEntity.id })
      .getOne();
    if (!wishListEntity) {
      wishListEntity = wishListRepository.create();
      wishListEntity.user = userEntity;
      wishListEntity = await wishListRepository.save(wishListEntity);
    }
    return wishListEntity;
  }

  async getWishList(userId: string) {
    return await this.mapper.convertToWishListResponse(
      await this.getWishListDetails(userId),
    );
  }

  async getUser(userId: string) {
    const userRepository: Repository<UserEntity> =
      this.dataSource.getRepository(UserEntity);
    const userEntity: UserEntity = await userRepository.findOneBy({
      id: userId,
    });
    if (!userEntity) {
      throw new NotFoundException('User not found.');
    }
    return userEntity;
  }

  async removeFromWishList(dto: WishListUpdateDto) {
    const wishListEntity: WishListEntity = await this.getWishListDetails(
      dto.userId,
    );
    const wishListLineRepository: Repository<WishListLineItemEntity> =
      this.dataSource.getRepository(WishListLineItemEntity);
    return await Promise.all(
      dto?.lineItems?.map(async (lineItem) => {
        const existingLineItem = await wishListLineRepository
          .createQueryBuilder()
          .andWhere('wishlist_id = :wishListId', {
            wishListId: wishListEntity.id,
          })
          .andWhere('product_id = :productId', {
            productId: lineItem?.productId,
          })
          .getOne();
        if (existingLineItem) {
          return await wishListLineRepository.delete({
            wishListDetails: wishListEntity,
            productId: lineItem.productId,
          });
        }
      }),
    );
  }
}
