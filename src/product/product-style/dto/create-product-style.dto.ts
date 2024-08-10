import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';

export class CreateProductStyleDto {
  @ApiProperty({ required: false })
  @ValidateIf((val) => (val.id ? true : false))
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;
}
