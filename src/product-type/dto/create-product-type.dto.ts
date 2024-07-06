import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductTypeDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'test-product-type',
    required: true,
  })
  name: string;
  @IsNotEmpty()
  @ApiProperty({
    example: 'test-product-description',
    required: false,
  })
  description: string;
}
