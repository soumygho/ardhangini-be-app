import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import {
  IS_ADMIN_KEY,
  IS_PUBLIC_KEY,
  IS_REFRESH_TOKEN,
} from '../constants/auth.contant';
import { ConfigService } from '@nestjs/config';
import { PayLoad } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const isRefreshToken = this.reflector.getAllAndOverride<boolean>(
      IS_REFRESH_TOKEN,
      [context.getHandler(), context.getClass()],
    );

    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      let payload: PayLoad;
      if (!isRefreshToken) {
        payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        });
      } else {
        payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        });
      }
      if (isAdmin && !payload?.isAdmin) {
        throw new UnauthorizedException();
      }
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
