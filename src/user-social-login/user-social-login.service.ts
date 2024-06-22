import { Injectable } from '@nestjs/common';
import { CreateUserSocialLoginDto } from './dto/create-user-social-login.dto';
import { UpdateUserSocialLoginDto } from './dto/update-user-social-login.dto';

@Injectable()
export class UserSocialLoginService {
  create(createUserSocialLoginDto: CreateUserSocialLoginDto) {
    return 'This action adds a new userSocialLogin';
  }

  findAll() {
    return `This action returns all userSocialLogin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSocialLogin`;
  }

  update(id: number, updateUserSocialLoginDto: UpdateUserSocialLoginDto) {
    return `This action updates a #${id} userSocialLogin`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSocialLogin`;
  }
}
