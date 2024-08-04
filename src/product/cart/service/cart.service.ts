import { DataSource, Repository } from 'typeorm';
import { AddOrUpdateCartTransaction } from '../transaction/add-update-cart.transaction';
import { CartResponseMapper } from '../util/cart-response.mapper';
import { CartLineItemDto, CartUpdateDto } from '../dto/cart-update.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CartDetailsEntity } from '../entity/cart-details.entity';
import { CartLineItemEntity } from '../entity/cart-line-item.entity';

@Injectable()
export class CartService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly transaction: AddOrUpdateCartTransaction,
    private readonly mapper: CartResponseMapper,
  ) {}

  async addOrEditItemInCart(dto: CartUpdateDto) {
    dto = await this.constructCartUpdateDtoForAdd(dto, true);
    return this.transaction.run(dto);
  }

  private async getCart(userId: string) {
    const userRepository: Repository<UserEntity> =
      this.dataSource.getRepository(UserEntity);
    const cartRepository: Repository<CartDetailsEntity> =
      this.dataSource.getRepository(CartDetailsEntity);
    const user: UserEntity = await userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    let cart: CartDetailsEntity = await cartRepository.findOneBy({
      userDetails: user,
      isOrdered: false,
    });

    if (!cart) {
      cart = cartRepository.create();
      cart.userDetails = user;
      cart.isOrdered = false;
      cart = await cartRepository.save(cart);
    }
    return cart;
  }

  async getCartDetails(userId: string) {
    return await this.mapper.convertCartResponse(await this.getCart(userId));
  }

  async deleteFromCart(dto: CartUpdateDto) {
    const cart: CartDetailsEntity = await this.getCart(dto?.userId);
    const cartLineRepository: Repository<CartLineItemEntity> =
      this.dataSource.getRepository(CartLineItemEntity);
    dto?.lineItems?.forEach(async (lineItem) => {
      if (
        await cartLineRepository.existsBy({
          cartDetails: cart,
          productId: lineItem?.productId,
        })
      ) {
        await cartLineRepository.delete({
          cartDetails: cart,
          productId: lineItem?.productId,
        });
      }
    });
  }

  async deleteCart(cartId: string, userId: string) {
    const cartRepository: Repository<CartDetailsEntity> =
      this.dataSource.getRepository(CartDetailsEntity);
    const userRepository: Repository<UserEntity> =
      this.dataSource.getRepository(UserEntity);
    this.dataSource.getRepository(CartDetailsEntity);
    const user: UserEntity = await userRepository.findOneBy({ id: userId });
    const cartDetails: CartDetailsEntity = await cartRepository.findOneBy({
      userDetails: user,
      id: cartId,
      isOrdered: false,
    });
    if (!cartDetails) {
      throw new NotFoundException('cart not found.');
    }
    const result = await cartRepository.delete({
      userDetails: user,
      id: cartId,
      isOrdered: false,
    });
    if (result.affected === 1) {
      return true;
    }
    return false;
  }

  private async constructCartUpdateDtoForAdd(
    dto: CartUpdateDto,
    isAddOrUpdate: boolean,
  ) {
    const userDetails: UserEntity = await this.dataSource
      .getRepository(UserEntity)
      .findOneBy({ id: dto.userId });
    if (!userDetails) {
      throw new NotFoundException('User not found.');
    }
    const cartDetailsEntity: CartDetailsEntity = await this.dataSource
      .getRepository(CartDetailsEntity)
      .findOneBy({ userDetails: userDetails, isOrdered: false });
    if (cartDetailsEntity) {
      if (isAddOrUpdate) {
        const lineEntities: CartLineItemEntity[] = await this.dataSource
          .getRepository(CartLineItemEntity)
          .findBy({ cartDetails: cartDetailsEntity });
        const lineItemMap = new Map<string, CartLineItemDto>();
        dto?.lineItems?.forEach((lineItemDto) =>
          lineItemMap.set(lineItemDto.productId, lineItemDto),
        );
        const finalLineItems: CartLineItemDto[] = [];

        lineEntities.forEach((lineItemEntity) => {
          if (!lineItemMap.has(lineItemEntity.productId)) {
            const dto: CartLineItemDto = new CartLineItemDto();
            dto.productId = lineItemEntity.productId;
            dto.quantity = lineItemEntity.quantity;
            dto.typeId = lineItemEntity.productType.id;
            lineItemMap.set(dto.productId, dto);
          }
        });
        Array.from(lineItemMap.values()).forEach((value) => {
          finalLineItems.push(value);
        });
        dto.lineItems = finalLineItems;
      }
    }
    return dto;
  }
}
