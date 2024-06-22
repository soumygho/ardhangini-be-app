import { PartialType } from '@nestjs/swagger';
import { CreateUserSocialLoginDto } from './create-user-social-login.dto';

export class UpdateUserSocialLoginDto extends PartialType(CreateUserSocialLoginDto) {}
