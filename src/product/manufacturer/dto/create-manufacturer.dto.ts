import { ApiProperty } from '@nestjs/swagger';

export class CreateManufacturerDto {
  @ApiProperty({
    example: 'India',
    required: true,
  })
  origin: string;
  @ApiProperty({
    example: 'test-manufacturer',
    required: true,
  })
  name: string;
  @ApiProperty({
    example: 'India',
    required: true,
  })
  address: string;
}
