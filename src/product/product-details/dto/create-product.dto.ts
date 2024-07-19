import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';
import { CreateSareeDetailsDto } from './create-saree-details.dto';

export class CreateProductDto {
  @ApiProperty({
    example: 'da744f87-b332-4e1f-9c2c-5119b92bf42d',
    required: false,
  })
  @ValidateIf((object) => (object.productId ? true : false))
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: 'da744f87-b332-4e1f-9c2c-5119b92bf42d',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  productTypeId: string;
  @ApiProperty({
    example: 'da744f87-b332-4e1f-9c2c-5119b92bf42d',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
  @ApiProperty({
    example: 'da744f87-b332-4e1f-9c2c-5119b92bf42d',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  subCategoryId: string;
  @ApiProperty({
    example: 'da744f87-b332-4e1f-9c2c-5119b92bf42d',
    required: true,
  })
  @IsNotEmpty()
  manufacturerId: string;
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
  @ApiProperty({
    example: 'test',
    required: true,
  })
  @IsNotEmpty()
  productName: string;
  @ApiProperty({
    example: 'test',
    required: true,
  })
  @IsNotEmpty()
  productDescription: string;
  @ApiProperty({
    example: '120',
    required: true,
  })
  @IsNotEmpty()
  offerprice: number;
  @ApiProperty({
    example: '170',
    required: true,
  })
  @IsNotEmpty()
  actualprice: number;
  @ApiProperty({
    example: true,
    required: true,
  })
  isActive: boolean;
  @ApiProperty({
    required: true,
  })
  productDetails: CreateSareeDetailsDto;
  @ApiProperty({
    example: '9.6',
    required: true,
  })
  @IsNotEmpty()
  cgst: number;
  @ApiProperty({
    example: '9.6',
    required: true,
  })
  @IsNotEmpty()
  sgst: number;
}
