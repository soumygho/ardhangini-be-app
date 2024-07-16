import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from 'src/user/entities/user.entity';

export class UserResponse extends PartialType(UserEntity, {
  skipNullProperties: true,
}) {}
