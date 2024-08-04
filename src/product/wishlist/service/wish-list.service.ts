import { DataSource, Repository } from 'typeorm';
import { WishListUpdateDto } from '../dto/wishlist-update.dto';
import { AddOrUpdateWishListTransaction } from '../transaction/add-update-wishlist.transaction';
import { WishListResponseMapper } from '../util/wishlist-response.mapper';
import { UserEntity } from 'src/user/entities/user.entity';
import { use } from 'passport';
import { NotFoundException } from '@nestjs/common';
import { WishListEntity } from '../entity/wishlist.entity';
import { WishListLineItemEntity } from '../entity/wishlist-item.entity';

export class WishListService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly transaction: AddOrUpdateWishListTransaction,
    private readonly mapper: WishListResponseMapper,
  ) {}

  async addOrUpdateWishList(dto: WishListUpdateDto) {
    return await this.transaction.run(dto);
  }

  private async getWishListDetails(userId: string) {
    const userEntity: UserEntity = await this.getUser(userId);
    const wishListRepository: Repository<WishListEntity> =
      this.dataSource.getRepository(WishListEntity);
    let wishListEntity: WishListEntity = await wishListRepository.findOneBy({
      user: userEntity,
    });
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
    dto?.lineItems?.forEach(async (lineItem) => {
      if (
        await wishListLineRepository.existsBy({
          wishListDetails: wishListEntity,
          productId: lineItem.productId,
        })
      ) {
        await wishListLineRepository.delete({
          wishListDetails: wishListEntity,
          productId: lineItem.productId,
        });
      }
    });
  }
}
