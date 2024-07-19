import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSareeDetailsDto {
  @ApiProperty({
    example: 'da744f87-b332-4e1f-9c2c-5119b92bf42d',
    required: true,
  })
  @IsNotEmpty()
  fabricDetailsId: string;
  @ApiProperty({
    example: '9',
    required: true,
  })
  @IsNotEmpty()
  length: number;
  @ApiProperty({
    example: '2.5',
    required: true,
  })
  @IsNotEmpty()
  width: number;
  @ApiProperty({
    example: true,
    required: true,
  })
  @IsNotEmpty()
  isBlousePieceIncluded: boolean = false;
  @ApiProperty({
    example: 'Blouse Description',
    required: true,
  })
  @IsNotEmpty()
  blouseDescription: string;
}
