import { BaseTransaction } from 'src/common/entity/BaseTransaction';
import { CartLineItemDto, CartUpdateDto } from '../dto/cart-update.dto';
import { CartDetailsEntity } from '../entity/cart-details.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ProductTypeEntity } from 'src/product/product-type/entities/product-type.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CartLineItemEntity } from '../entity/cart-line-item.entity';
import { ProductTypes } from 'src/product/product-type/enum/product-type.enum';
import { SareeEntity } from 'src/product/product-details';
import { UserEntity } from 'src/user/entities/user.entity';
@Injectable()
export class AddOrUpdateCartTransaction extends BaseTransaction<
  CartUpdateDto,
  CartDetailsEntity
> {
  constructor(private readonly dataSource: DataSource) {
    super(dataSource);
  }
  protected async execute(
    data: CartUpdateDto,
    manager: EntityManager,
  ): Promise<CartDetailsEntity> {
    const productTypeRepository: Repository<ProductTypeEntity> =
      manager.getRepository(ProductTypeEntity);
    const userRepository: Repository<UserEntity> =
      manager.getRepository(UserEntity);
    const cartRepository: Repository<CartDetailsEntity> =
      manager.getRepository(CartDetailsEntity);
    const cartLineItemRepository: Repository<CartLineItemEntity> =
      manager.getRepository(CartLineItemEntity);
    const productRepository: Repository<SareeEntity> =
      manager.getRepository(SareeEntity);

    const userDetails: UserEntity = await userRepository.findOneBy({
      id: data.userId,
    });
    if (!userDetails) {
      throw new NotFoundException('User not found.');
    }

    let cartDetails: CartDetailsEntity = await cartRepository
      .createQueryBuilder()
      .andWhere('user_id = :userId', { userId: userDetails.id })
      .andWhere('is_ordered = :ordered', { ordered: false })
      .getOne();
    //if free cart is not available create a new one and ensure at any point we should have only one free cart
    if (!cartDetails) {
      cartDetails = cartRepository.create();
      cartDetails.userDetails = userDetails;
      cartDetails = await cartRepository.save(cartDetails);
    }

    //cleanup the whole line item data
    await cartLineItemRepository.delete({ cartDetails: cartDetails });
    //cart line item processing logic
    await Promise.all(
      data?.lineItems?.map(async (lineItem: CartLineItemDto) => {
        const productType: ProductTypeEntity =
          await productTypeRepository.findOneBy({ id: lineItem.typeId });
        if (!productType) {
          throw new NotFoundException('ProductType not found.');
        }
        //line item processing logic
        const saree: SareeEntity = await productRepository
          .createQueryBuilder()
          .andWhere('id = :productId', { productId: lineItem?.productId })
          .getOne();
        if (!saree) {
          throw new NotFoundException('Product not found.');
        }
        const lineItemEntity: CartLineItemEntity =
          cartLineItemRepository.create();
        /*if (saree.available_qty < lineItem.quantity) {
        throw new BadRequestException(`${saree.productName} is out of stock.`);
      }
      if (lineItem.quantity > saree.maxQuantityPerCart) {
        throw new BadRequestException(
          `${saree.productName} max quantity allowed per cart is ${saree.maxQuantityPerCart}.`,
        );
      }*/
        lineItemEntity.cartDetails = cartDetails;
        lineItemEntity.productId = saree.id;
        lineItemEntity.productType = productType;
        lineItemEntity.quantity = lineItem.quantity;
        //lineItemEntities.push(lineItemEntity);
        //As we are not supporting multiple products right now it is not needed
        if (productType.name.toLowerCase() === ProductTypes.SAREE) {
        }
        return await cartLineItemRepository.save(lineItemEntity);
      }),
    );
    return cartDetails;
  }
}
