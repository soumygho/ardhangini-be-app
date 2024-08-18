import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';

export class UpdateAdminUserDto {
  @ApiProperty({
    required: false,
  })
  @ValidateIf((value) => Boolean(value?.id))
  @IsUUID()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  userName: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @ApiProperty({ required: false })
  role: string[];
}
