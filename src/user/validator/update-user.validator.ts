import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateUserValidationPipe implements PipeTransform {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async transform(value: UpdateUserDto, metadata: ArgumentMetadata) {
    let isEmailValidationSuccessful = false;
    let isMobileValidationSuccessful = false;
    if (value?.userid) {
      const userEntity = await this.userRepository.findOneBy({
        id: value.userid,
      });
      if (!userEntity) {
        throw new BadRequestException('User not found.');
      }
      if (value?.email === userEntity?.email) {
        isEmailValidationSuccessful = true;
      }
      if (value?.mobile === userEntity?.mobile) {
        isMobileValidationSuccessful = true;
      }

      if (
        !isEmailValidationSuccessful &&
        (await this.userRepository.existsBy({ email: value?.email }))
      ) {
        throw new BadRequestException(
          'Email is already associated with other user.',
        );
      }
      if (
        !isMobileValidationSuccessful &&
        (await this.userRepository.existsBy({ mobile: value?.mobile }))
      ) {
        throw new BadRequestException(
          'Mobile is already associated with other user.',
        );
      }
    }
    return value;
  }
}
