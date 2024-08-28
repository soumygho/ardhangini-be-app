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
import { AuthService } from '../service/auth.service';
import { Admin, Public, RefreshToken } from '../decorators/auth.decorators';
import { AuthGuard } from '../guards/UserAuth.guard';
import { AdminAuthDto } from '../dto/admin/admin-auth.dto';
import { TokenResponse } from '../dto/auth.dto';

@ApiTags('admin-auth')
@Controller('admin-auth')
export class AdminAuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @ApiOperation({
    description: 'Signin using email and password For Admin Portal',
  })
  @ApiOkResponse({
    description: 'Token response',
    type: TokenResponse,
    isArray: false,
  })
  @Post('sign-in')
  @Public()
  signinUsingEmailAndPassword(@Body() dto: AdminAuthDto) {
    return this.authService.signInUsingEmailForAdminPortal(dto);
  }

  @ApiOperation({
    description: 'refresh token for Admin Portal',
  })
  @ApiOkResponse({
    description: 'Token response',
    type: TokenResponse,
    isArray: true,
  })
  @Get('refresh-token')
  @RefreshToken()
  @Admin()
  @UseGuards(AuthGuard)
  refreshToken(@Request() req) {
    return this.authService.refreshTokenForAdminPortal(req);
  }

  @Get('log-out')
  @ApiOperation({
    description: 'logout user from Admin Portal',
  })
  @Admin()
  @UseGuards(AuthGuard)
  logoutUser(@Request() req) {
    return this.authService.logoutForAdminPortal(req);
  }
}
