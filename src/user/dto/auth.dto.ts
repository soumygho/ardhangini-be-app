import { ApiProperty } from '@nestjs/swagger';

export type PayLoad = {
  sub: string;
  isAdmin: boolean;
  roles?: string[];
};

export class TokenResponse {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}
