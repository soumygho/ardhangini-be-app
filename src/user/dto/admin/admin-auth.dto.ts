import { ApiProperty } from '@nestjs/swagger';

export class AdminAuthDto {
  @ApiProperty()
  userName: string;
  @ApiProperty()
  password: string;
}
