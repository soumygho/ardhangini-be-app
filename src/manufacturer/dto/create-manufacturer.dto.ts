import { ApiProperty } from '@nestjs/swagger';

export class CreateManufacturerDto {
  @ApiProperty({
    name: 'Origin',
    example: 'India',
    required: true,
  })
  origin: string;
  @ApiProperty({
    name: 'Name',
    example: 'test-manufacturer',
    required: true,
  })
  name: string;
  @ApiProperty({
    name: 'Address of the manufacturer',
    example: 'India',
    required: true,
  })
  address: string;
}
