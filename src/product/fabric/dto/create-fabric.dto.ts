import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';

export class CreateFabricDto {
  @ApiProperty({
    example: '77a22d3c-bf05-476b-aea6-dbfba900067b',
    required: false,
  })
  @ValidateIf((object) => (object.id ? true : false))
  @IsUUID()
  id: string;
  @ApiProperty({
    example: 'test',
    required: true,
  })
  @IsNotEmpty()
  fabricName: string;
  @ApiProperty({
    example: 'test',
    required: false,
  })
  fabricDescription: string;
  @ApiProperty({
    example: 'test',
    required: false,
  })
  washCare: string;
}
