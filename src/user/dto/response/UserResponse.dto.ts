import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/user/entities/user.entity';

export class UserResponse extends PartialType(User, {
  skipNullProperties: true,
}) {}
