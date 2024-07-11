import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSubcategoryDto {
  @ApiProperty({
    example: 'test-sub-category',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'uuid for parent category',
    required: true,
  })
  @IsUUID()
  categoryid: string;

  @ApiProperty({
    example: 'subcategory-description',
    required: true,
  })
  @IsNotEmpty()
  description: string;
}
