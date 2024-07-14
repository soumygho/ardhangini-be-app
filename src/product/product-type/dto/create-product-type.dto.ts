import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ProductTypes } from '../../product-type/enum/product-type.enum';

export class CreateProductTypeDto {
  @IsNotEmpty()
  @ApiProperty({
    enum: ProductTypes,
    example: ProductTypes.SAREE,
    required: true,
  })
  name: ProductTypes;
  @IsNotEmpty()
  @ApiProperty({
    example: 'test-product-description',
    required: false,
  })
  description: string;
}
