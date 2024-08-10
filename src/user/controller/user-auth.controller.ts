import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { AuthService, TokenResponse } from '../service/auth.service';
import { EmailAuthDto } from '../dto/email-auth.dto';
import { Public, RefreshToken } from '../decorators/auth.decorators';
import { AuthGuard } from '../guards/UserAuth.guard';

@ApiTags('user-auth')
@Controller('user-auth')
export class UserAuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @ApiOperation({
    description: 'Signin using email and password',
  })
  @ApiOkResponse({
    description: 'Token response',
    type: TokenResponse,
    isArray: false,
  })
  @Post('sign-in')
  @Public()
  signinUsingEmailAndPassword(@Body() dto: EmailAuthDto) {
    return this.authService.signInUsingEmailForUserPortal(dto);
  }

  @ApiOperation({
    description: 'refresh token',
  })
  @ApiOkResponse({
    description: 'Token response',
    type: TokenResponse,
    isArray: true,
  })
  @Get('refresh-token')
  @RefreshToken()
  @UseGuards(AuthGuard)
  refreshToken(@Request() req) {
    return this.authService.refreshTokenForUserPortal(req);
  }

  @Get('log-out')
  @ApiOperation({
    description: 'logout user',
  })
  @UseGuards(AuthGuard)
  logoutUser(@Request() req) {
    return this.authService.logoutForUserPortal(req);
  }
}
