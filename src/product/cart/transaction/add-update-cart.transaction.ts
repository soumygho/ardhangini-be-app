import { BaseTransaction } from 'src/common/entity/BaseTransaction';
import { CartLineItemDto, CartUpdateDto } from '../dto/cart-update.dto';
import { CartDetailsEntity } from '../entity/cart-details.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ProductTypeEntity } from 'src/product/product-type/entities/product-type.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartLineItemEntity } from '../entity/cart-line-item.entity';
import { ProductTypes } from 'src/product/product-type/enum/product-type.enum';
import { SareeEntity } from 'src/product/product-details';
import { UserEntity } from 'src/user/entities/user.entity';
import { CartDetailsResponse } from '../dto/cart-response.dto';
import { CartResponseMapper } from '../util/cart-response.mapper';
@Injectable()
export class AddOrUpdateCartTransaction extends BaseTransaction<
  CartUpdateDto,
  CartDetailsResponse
> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mapper: CartResponseMapper,
  ) {
    super(dataSource);
  }
  protected async execute(
    data: CartUpdateDto,
    manager: EntityManager,
  ): Promise<CartDetailsResponse> {
    const productTypeRepository: Repository<ProductTypeEntity> =
      manager.getRepository(ProductTypeEntity);
    const userRepository: Repository<UserEntity> =
      manager.getRepository(UserEntity);
    const cartRepository: Repository<CartDetailsEntity> =
      manager.getRepository(CartDetailsEntity);
    const cartLineItemRepository: Repository<CartLineItemEntity> =
      manager.getRepository(CartLineItemEntity);

    const userDetails: UserEntity = await userRepository.findOneBy({
      id: data.userId,
    });
    if (!userDetails) {
      throw new NotFoundException('User not found.');
    }

    let cartDetails: CartDetailsEntity = await cartRepository.findOneBy({
      userDetails: userDetails,
      isOrdered: false,
    });
    //if free cart is not available create a new one and ensure at any point we should have only one free cart
    if (!cartDetails) {
      cartDetails = cartRepository.create();
      cartDetails.userDetails = userDetails;
      cartDetails = await cartRepository.save(cartDetails);
    }
    //cart line item processing logic
    const lineItemEntities: CartLineItemEntity[] = [];

    data.lineItems.forEach(async (lineItem: CartLineItemDto) => {
      const productType: ProductTypeEntity =
        await productTypeRepository.findOneBy({ id: lineItem.typeId });
      if (!productType) {
        throw new NotFoundException('ProductType not found.');
      }
      //line item processing logic
      const productRepository = manager.getRepository(SareeEntity);
      const saree: SareeEntity = await productRepository.findOneBy({
        id: lineItem.productId,
      });
      if (!saree) {
        throw new NotFoundException('Product not found.');
      }
      const lineItemEntity: CartLineItemEntity =
        cartLineItemRepository.create();
      if (saree.available_qty < lineItem.quantity) {
        throw new ConflictException(`${saree.productName} is out of stock.`);
      }
      if (lineItem.quantity > saree.maxQuantityPerCart) {
        throw new ConflictException(
          `${saree.productName} max quantity allowed per cart is ${saree.maxQuantityPerCart}.`,
        );
      }
      lineItemEntity.cartDetails = cartDetails;
      lineItemEntity.productId = saree.id;
      lineItemEntity.productType = productType;
      lineItemEntity.quantity = lineItem.quantity;
      lineItemEntities.push(lineItemEntity);
      //As we are not supporting multiple products right now it is not needed
      if (productType.name.toLowerCase() === ProductTypes.SAREE) {
      }
    });
    //cleanup the whole line item data
    cartLineItemRepository.delete({ cartDetails: cartDetails });
    //then resave it
    lineItemEntities.forEach(async (lineItemEntity) => {
      await cartLineItemRepository.save(lineItemEntity);
    });
    return await this.mapper.convertCartResponse(cartDetails);
  }
}
