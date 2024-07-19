import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProductImageUploadDto {
  @ApiProperty({
    example: 'image description',
    required: true,
  })
  @IsNotEmpty()
  imageDescription: string;

  @ApiProperty({
    example: 'da744f87-b332-4e1f-9c2c-5119b92bf42d',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: 'da744f87-b332-4e1f-9c2c-5119b92bf42d',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  productTypeId: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
