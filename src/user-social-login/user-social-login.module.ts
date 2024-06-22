import { Module } from '@nestjs/common';
import { UserSocialLoginService } from './user-social-login.service';
import { UserSocialLoginController } from './user-social-login.controller';

@Module({
  controllers: [UserSocialLoginController],
  providers: [UserSocialLoginService],
})
export class UserSocialLoginModule {}
