import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RegisterEmailPasswordDto } from '../dto/register-email-password.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserValidationPipe } from '../validator/update-user.validator';
import { Request } from 'express';
import { PayLoad } from '../dto/auth.dto';
import { AuthGuard } from '../guards/UserAuth.guard';

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

  @ApiOperation({
    description: 'Return the user list for admin usage',
  })
  @ApiOkResponse({
    description: 'All users Response',
    type: UserEntity,
    isArray: true,
  })
  @Get('/admin/get-all')
  findAllUsersForAdmin() {
    return this.userService.findAll();
  }

  @Get('/user-details/:id')
  @ApiOperation({
    description: 'Return the user details for user portal',
  })
  @ApiOkResponse({
    description: 'User Details Response',
    type: UserEntity,
    isArray: false,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    description: 'Return the user details for user portal using supplied token',
  })
  @ApiOkResponse({
    description: 'User Details Response',
    type: UserEntity,
    isArray: false,
  })
  @Get('')
  @UseGuards(AuthGuard)
  getUserDetailsByToken(@Req() request: Request) {
    const userDetails: PayLoad = request['user'] as PayLoad;
    console.trace('user details : ');
    console.trace(userDetails);
    if (userDetails && userDetails.sub)
      return this.userService.findOne(userDetails?.sub);
  }

  @Patch('')
  @ApiOperation({
    description: 'Update the user details for user portal',
  })
  @ApiOkResponse({
    description: 'User Details Response',
    type: UserEntity,
    isArray: false,
  })
  update(@Body(UpdateUserValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
