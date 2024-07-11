import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'product-type-id',
    required: true,
  })
  @IsNotEmpty()
  productTypeId: string;
  @ApiProperty({
    example: 'category-id',
    required: true,
  })
  @IsNotEmpty()
  categoryId: string;
  @ApiProperty({
    example: 'sub-category-id',
    required: true,
  })
  @IsNotEmpty()
  subCategoryId: string;
  @ApiProperty({
    example: 'manufacturer-id',
    required: true,
  })
  @IsNotEmpty()
  manufacturerId: string;
  @ApiProperty({
    example: 'fabric-id',
    required: true,
  })
  @IsNotEmpty()
  fabricDetailsId: string;
  @ApiProperty({
    example: 'length',
    required: true,
  })
  @IsNotEmpty()
  length: number;
  @ApiProperty({
    example: 'width',
    required: true,
  })
  @IsNotEmpty()
  width: number;
  @ApiProperty({
    example: 'Blouse piece included? true/false',
    required: true,
  })
  @IsNotEmpty()
  isBlousePieceIncluded: boolean = false;
  @ApiProperty({
    example: 'product description',
    required: true,
  })
  @IsNotEmpty()
  blouseDescription: string;
  @ApiProperty({
    example: 'return exchange policy',
    required: true,
  })
  @IsNotEmpty()
  returnExchangePolicy: string;
  @ApiProperty({
    example: 'skuid',
    required: true,
  })
  @IsNotEmpty()
  skuid: string;
  @IsNotEmpty()
  productName: string;
  @IsNotEmpty()
  productDescription: string;
  @IsNotEmpty()
  offerprice: number;
  @IsNotEmpty()
  actualprice: number;
}
