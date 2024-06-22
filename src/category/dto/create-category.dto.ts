import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'test-category',
    required: true,
  })
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    example: 'category-description',
    required: true,
  })
  @IsNotEmpty()
  description: string;
}
