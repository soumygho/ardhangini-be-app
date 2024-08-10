import { Module } from '@nestjs/common';
import { UserService } from './service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserExistsRule } from './validator/user-exists-rule.validator';
import { UserLoginDetailsEntity } from './entities/user-login.entity';
import { RegisterUserWithEmailPasswordTransaction } from './transactions/register-user-with-email-password.transaction';
import { UserProfileImageEntity } from './entities/user-profile-image.entity';
import { DeliveryAddressEntity } from './entities/delivery-address.entity';
import { DeliveryAddressController } from './controller/delivery-address.controller';
import { DeliveryAddressService } from './service/delivery-address.service';
import { UpdateUserValidationPipe } from './validator/update-user.validator';
import { AuthService } from './service/auth.service';
import { UserAuthController } from './controller/user-auth.controller';
import { AuthGuard } from './guards/UserAuth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserLoginDetailsEntity,
      UserProfileImageEntity,
      DeliveryAddressEntity,
    ]),
  ],
  controllers: [UserController, DeliveryAddressController, UserAuthController],
  providers: [
    UserService,
    UserExistsRule,
    RegisterUserWithEmailPasswordTransaction,
    DeliveryAddressService,
    UpdateUserValidationPipe,
    AuthService,
    AuthGuard,
  ],
})
export class UserModule {}
