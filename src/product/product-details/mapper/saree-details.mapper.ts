import { SareeDetailsEntity } from '../entities/saree/saree-details.entity';
import { ProductSnapshotDto } from '../dto/product-snapshot.dto';
import { BaseMapper } from 'src/common/mapper/base.mapper';
import { SareeEntity } from '../entities';
import { SareeDetailsDto } from '../dto/saree-details.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { CartDetailsEntity } from 'src/product/cart/entity/cart-details.entity';
import { WishListEntity } from 'src/product/wishlist/entity/wishlist.entity';
import { ProductSnapshotWithUserDto } from '../dto/product-snapshot-with-user.dto';
import { CartLineItemEntity } from 'src/product/cart/entity/cart-line-item.entity';
import { WishListLineItemEntity } from 'src/product/wishlist/entity/wishlist-item.entity';

@Injectable()
export class SareeDetailsMapper extends BaseMapper<
  SareeEntity,
  ProductSnapshotDto
> {
  constructor(private readonly dataSource: DataSource) {
    super();
  }
  public async mapAndEnrichWithUserData(
    userId: string,
    source: SareeEntity,
  ): Promise<ProductSnapshotWithUserDto> {
    const userRepository: Repository<UserEntity> =
      this.dataSource.getRepository(UserEntity);
    const cartRepository: Repository<CartDetailsEntity> =
      this.dataSource.getRepository(CartDetailsEntity);
    const wishListRepository: Repository<WishListEntity> =
      this.dataSource.getRepository(WishListEntity);
    const cartLineItemRepository: Repository<CartLineItemEntity> =
      this.dataSource.getRepository(CartLineItemEntity);
    const wishListLineItemRepository: Repository<WishListLineItemEntity> =
      this.dataSource.getRepository(WishListLineItemEntity);
    const dto: ProductSnapshotWithUserDto = new ProductSnapshotWithUserDto();
    Object.assign(dto, this.mapFrom(source));
    dto.isCarted = false;
    dto.isWishListed = false;
    if (userId) {
      if (!(await userRepository.existsBy({ id: userId }))) {
        dto.isCarted = false;
        dto.isWishListed = false;
      }
      const userDetails: UserEntity = await userRepository.findOneBy({
        id: userId,
      });
      dto.isCarted = false;
      dto.isWishListed = false;
      const cartDetails: CartDetailsEntity = await cartRepository.findOneBy({
        userDetails: userDetails,
        isOrdered: false,
      });
      const wishListDetails: WishListEntity =
        await wishListRepository.findOneBy({
          user: userDetails,
        });
      if (cartDetails) {
        if (
          await cartLineItemRepository.existsBy({
            cartDetails: cartDetails,
            productId: source.id,
          })
        ) {
          dto.isCarted = true;
        }
      }
      if (wishListDetails) {
        if (
          await wishListLineItemRepository.existsBy({
            wishListDetails: wishListDetails,
            productId: source.id,
          })
        ) {
          dto.isWishListed = true;
        }
      }
    }
    return dto;
  }
  public mapFrom(source: SareeEntity): ProductSnapshotDto {
    const productSnapshot: ProductSnapshotDto = new ProductSnapshotDto();
    productSnapshot.productid = source.id;
    productSnapshot.actualprice = source.actualprice;
    productSnapshot.availableQuantity = source.available_qty;
    productSnapshot.averageReview = source.averageReview;
    productSnapshot.category = source.category.name;
    productSnapshot.isBestSeller = source.isBestSeller;
    productSnapshot.isNew = false;
    productSnapshot.isTrending = source.isTrending;
    productSnapshot.offerprice = source.offerprice;
    productSnapshot.productDetails = this.mapToSareeDetailsDto(source);
    productSnapshot.productdescription = source.productDescription;
    productSnapshot.productname = source.productName;
    productSnapshot.producttype = source.productType.name;
    productSnapshot.return_exchange_policy = source.returnExchangePolicy;
    productSnapshot.skuid = source.skuid;
    productSnapshot.subcategory = source.subCategory.name;
    productSnapshot.maxQuantityPerCart = source.maxQuantityPerCart;
    productSnapshot.promoDetails = source.promoDetails;
    productSnapshot.isExclusive = source.isExclusive;
    productSnapshot.productCollection = source.collection;
    productSnapshot.productColour = source.colour;
    productSnapshot.productOccassion = source.occassion;
    productSnapshot.productStyle = source.style;
    productSnapshot.productPrint = source.print;
    productSnapshot.maxAllowedCancellationDays =
      source.maxAllowedCancellationDays;
    productSnapshot.maxAllowedReturnDays = source.maxAllowedReturnDays;
    productSnapshot.isShippable = source.isShippable;
    return productSnapshot;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public mapTo(_target: ProductSnapshotDto): SareeEntity {
    throw new Error('Method not implemented.');
  }

  private mapToSareeDetailsDto(sareeEntity: SareeEntity): SareeDetailsDto {
    const sareeDetailsDto: SareeDetailsDto = new SareeDetailsDto();
    const sareeDetails: SareeDetailsEntity = sareeEntity.sareeDetails;
    sareeDetailsDto.blouse_desc = sareeDetails.blouse_desc;
    sareeDetailsDto.blouse_piece = sareeDetails.blousePieceIncluded;
    sareeDetailsDto.fabricDescription =
      sareeDetails.fabricDetails.fabricDescription;
    sareeDetailsDto.fabricname = sareeDetails.fabricDetails.fabricName;
    sareeDetailsDto.length = sareeDetails.length;
    sareeDetailsDto.width = sareeDetails.width;
    sareeDetailsDto.washcare = sareeDetails.fabricDetails.washCare;
    sareeDetailsDto.sareeImages = sareeEntity.productImages?.map(
      (image) => image?.imageSource,
    );
    return sareeDetailsDto;
  }
}
