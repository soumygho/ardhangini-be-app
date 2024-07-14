import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RegisterEmailPasswordDto } from '../dto/register-email-password.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';

@ApiTags('User')
@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @ApiOperation({
    description: 'Registers an user with email,name and date of birth,sex.',
  })
  @Post('/register/email')
  registerUsingEmailAndPassword(@Body() registerDto: RegisterEmailPasswordDto) {
    return this.userService.registerByEmailAndPassword(registerDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
