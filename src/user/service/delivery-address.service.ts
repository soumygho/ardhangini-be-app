import { Repository } from 'typeorm';
import { DeliveryAddressEntity } from './../entities/delivery-address.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDeliveryAddressDto } from '../dto/update-delivery-address.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class DeliveryAddressService {
  constructor(
    @InjectRepository(DeliveryAddressEntity)
    private readonly deliveryAddressRepository: Repository<DeliveryAddressEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createOrUpdate(dto: UpdateDeliveryAddressDto) {
    if (await this.userRepository.existsBy({ id: dto?.userId })) {
      const userEntity = await this.userRepository.findOneBy({
        id: dto?.userId,
      });
      const addressEntity = this.deliveryAddressRepository.create();
      Object.assign(addressEntity, dto);
      if (dto?.addressId) {
        if (
          await this.deliveryAddressRepository.existsBy({ id: dto?.addressId })
        ) {
          addressEntity.id = dto.addressId;
        } else {
          throw new NotFoundException(
            'Address not found with the id provided.',
          );
        }
      }
      addressEntity.userDetails = userEntity;
    } else {
      throw new BadRequestException('User not found.');
    }
  }

  async findAllByUserId(userId: string) {
    if (await this.userRepository.existsBy({ id: userId })) {
      const userEntity = await this.userRepository.findOneBy({ id: userId });
      return this.deliveryAddressRepository.findBy({ userDetails: userEntity });
    } else {
      throw new BadRequestException('User not found.');
    }
  }

  async remove(addressId: string) {
    return await this.deliveryAddressRepository.delete({ id: addressId });
  }
}
