import { DataSource, Repository } from 'typeorm';
import { AddOrUpdateCartTransaction } from '../transaction/add-update-cart.transaction';
import { CartResponseMapper } from '../util/cart-response.mapper';
import { CartUpdateDto } from '../dto/cart-update.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { CartDetailsEntity } from '../entity/cart-details.entity';

export class CartService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly transaction: AddOrUpdateCartTransaction,
    private readonly mapper: CartResponseMapper,
  ) {}

  async createOrUpdate(cartDetailsDto: CartUpdateDto) {
    return await this.transaction.run(cartDetailsDto);
  }

  async getCart(userId: string, cartId: string) {
    const userRepository: Repository<UserEntity> =
      this.dataSource.getRepository(UserEntity);
    const cartRepository: Repository<CartDetailsEntity> =
      this.dataSource.getRepository(CartDetailsEntity);
    const user: UserEntity = await userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const cart: CartDetailsEntity = await cartRepository.findOneBy({
      id: cartId,
      userDetails: user,
    });

    if (!cart) {
      throw new NotFoundException('Cart not found.');
    }
    return this.mapper.convertCartResponse(cart);
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
}
