import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSocialLoginService } from './user-social-login.service';
import { CreateUserSocialLoginDto } from './dto/create-user-social-login.dto';
import { UpdateUserSocialLoginDto } from './dto/update-user-social-login.dto';

@Controller('user-social-login')
export class UserSocialLoginController {
  constructor(private readonly userSocialLoginService: UserSocialLoginService) {}

  @Post()
  create(@Body() createUserSocialLoginDto: CreateUserSocialLoginDto) {
    return this.userSocialLoginService.create(createUserSocialLoginDto);
  }

  @Get()
  findAll() {
    return this.userSocialLoginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSocialLoginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSocialLoginDto: UpdateUserSocialLoginDto) {
    return this.userSocialLoginService.update(+id, updateUserSocialLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSocialLoginService.remove(+id);
  }
}
