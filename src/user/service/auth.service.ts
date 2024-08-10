import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EmailAuthDto } from '../dto/email-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserLoginDetailsEntity } from '../entities/user-login.entity';
import { LoginType } from '../enum/user.enum';
import { Request } from 'express';

export type PayLoad = {
  sub: string;
  isAdmin: boolean;
  roles?: string[];
};

export class TokenResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  saltOrRounds: number = 10;

  //user portal authentication service
  async signInUsingEmailForUserPortal(dto: EmailAuthDto) {
    const userEntity = await this.dataSource
      .getRepository(UserEntity)
      .findOneBy({ email: dto?.email });

    if (!userEntity) {
      throw new BadRequestException('User not found with the email');
    }
    const userLoginEntity = await this.dataSource
      .getRepository(UserLoginDetailsEntity)
      .createQueryBuilder()
      .andWhere('user_id = :userId', { userId: userEntity.id })
      .andWhere('login_type = :loginType', { loginType: LoginType.EMAIL })
      .getOne();
    if (!userLoginEntity) {
      throw new BadRequestException(
        'User is not enabled for email authentication.',
      );
    }
    const isMatch = await bcrypt.compare(
      dto?.password,
      userLoginEntity.password,
    );
    if (isMatch) {
      const tokenResponse = await this.generateTokens(userEntity.id, false);
      userEntity.refreshToken = await bcrypt.hash(
        tokenResponse.refreshToken,
        this.saltOrRounds,
      );
      //save the refresh token to designate user is logged in
      await this.dataSource.getRepository(UserEntity).save(userEntity);
      return tokenResponse;
    } else {
      throw new BadRequestException('Login details is incorrect.');
    }
  }

  //user portal authentication service
  async refreshTokenForUserPortal(request: Request) {
    const payload = request['user'] as PayLoad;
    console.trace(payload);
    const userEntity = await this.dataSource
      .getRepository(UserEntity)
      .findOneBy({ id: payload?.sub });
    if (!userEntity) {
      throw new BadRequestException('user not found.');
    }
    if (!userEntity?.refreshToken) {
      throw new BadRequestException('user already logged out.');
    }

    const response = await this.generateTokens(userEntity?.id, false);
    userEntity.refreshToken = response?.refreshToken;
    await this.dataSource.getRepository(UserEntity).save(userEntity);
    return response;
  }

  //user portal authentication service
  async logoutForUserPortal(request: Request) {
    const payload = request['user'] as PayLoad;
    console.trace(payload);
    const userEntity = await this.dataSource
      .getRepository(UserEntity)
      .findOneBy({ id: payload?.sub });
    if (!userEntity) {
      throw new BadRequestException('user not found.');
    }
    userEntity.refreshToken = '';
    await this.dataSource.getRepository(UserEntity).save(userEntity);
  }

  public async generateTokens(
    userId: string,
    isAdmin: boolean,
    roles?: string[],
  ) {
    const data: PayLoad = isAdmin
      ? {
          sub: userId,
          isAdmin: isAdmin,
        }
      : {
          sub: userId,
          isAdmin: isAdmin,
          roles: roles,
        };
    const accessToken: string = await this.jwtService.signAsync(data, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: 3600,
    });
    const refreshToken: string = await this.jwtService.signAsync(data, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: 86400,
    });
    const tokenResponse: TokenResponse = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    return tokenResponse;
  }
}
