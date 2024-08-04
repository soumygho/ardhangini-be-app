import { BaseTransaction } from 'src/common/entity/BaseTransaction';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ProductTypeEntity } from 'src/product/product-type/entities/product-type.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductTypes } from 'src/product/product-type/enum/product-type.enum';
import { SareeEntity } from 'src/product/product-details';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  WishListLineItemDto,
  WishListUpdateDto,
} from '../dto/wishlist-update.dto';
import { WishListDetailsResponse } from '../dto/wishlist-response.dto';
import { WishListResponseMapper } from '../util/wishlist-response.mapper';
import { WishListEntity } from '../entity/wishlist.entity';
import { WishListLineItemEntity } from '../entity/wishlist-item.entity';

@Injectable()
export class AddOrUpdateWishListTransaction extends BaseTransaction<
  WishListUpdateDto,
  WishListDetailsResponse
> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mapper: WishListResponseMapper,
  ) {
    super(dataSource);
  }
  protected async execute(
    data: WishListUpdateDto,
    manager: EntityManager,
  ): Promise<WishListDetailsResponse> {
    const productTypeRepository: Repository<ProductTypeEntity> =
      manager.getRepository(ProductTypeEntity);
    const userRepository: Repository<UserEntity> =
      manager.getRepository(UserEntity);
    const wishListRepository: Repository<WishListEntity> =
      manager.getRepository(WishListEntity);
    const wishListLineItemRepository: Repository<WishListLineItemEntity> =
      manager.getRepository(WishListLineItemEntity);
    const userDetails: UserEntity = await userRepository.findOneBy({
      id: data.userId,
    });
    if (!userDetails) {
      throw new NotFoundException('User not found.');
    }
    let wishListDetails: WishListEntity = await wishListRepository.findOneBy({
      user: userDetails,
    });

    if (!wishListDetails) {
      wishListDetails = wishListRepository.create();
      wishListDetails.user = userDetails;
      wishListDetails = await wishListRepository.save(wishListDetails);
    }
    const lineItemEntities: WishListLineItemEntity[] = [];

    data.lineItems.forEach(async (lineItem: WishListLineItemDto) => {
      /*const productType: ProductTypeEntity =
        await productTypeRepository.findOneBy({ id: lineItem.typeId });
      if (!productType) {
        throw new NotFoundException('ProductType not found.');
      }*/
      const productRepository = manager.getRepository(SareeEntity);
      // if (productType.name.toLowerCase() === ProductTypes.SAREE) {}
      const saree: SareeEntity = await productRepository.findOneBy({
        id: lineItem.productId,
      });
      if (!saree) {
        throw new NotFoundException('Product not found.');
      }
      if (
        !(await wishListLineItemRepository.existsBy({
          wishListDetails: wishListDetails,
          productId: lineItem.productId,
        }))
      ) {
        const lineItemEntity: WishListLineItemEntity =
          wishListLineItemRepository.create();
        lineItemEntity.wishListDetails = wishListDetails;
        lineItemEntity.productId = saree.id;
        lineItemEntity.productType = saree.productType;
        lineItemEntities.push(lineItemEntity);
      }
    });
    //wishListLineItemRepository.delete({ wishListDetails: wishListDetails });
    lineItemEntities.forEach(async (lineItemEntity) => {
      await wishListLineItemRepository.save(lineItemEntity);
    });
    wishListDetails = await wishListRepository.findOneBy({
      id: wishListDetails.id,
    });
    return await this.mapper.convertToWishListResponse(wishListDetails);
  }
}
