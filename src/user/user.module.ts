import { Module } from '@nestjs/common';
import { UserService } from './service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserExistsRule } from './validator/user-exists-rule.validator';
import { UserLoginDetailsEntity } from './entities/user-login.entity';
import { RegisterUserWithEmailPasswordTransaction } from './transactions/register-user-with-email-password.transaction';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserLoginDetailsEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    UserExistsRule,
    RegisterUserWithEmailPasswordTransaction,
  ],
})
export class UserModule {}
