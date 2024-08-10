import { ApiProperty } from '@nestjs/swagger';

export class CreatePromoDto {
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  endDate: Date;
  @ApiProperty()
  description: string;
  @ApiProperty({ required: false })
  minimumOrderValue: number;
  @ApiProperty({
    required: false,
  })
  discountPercentage: number;
  @ApiProperty({
    required: false,
  })
  flatDiscount: number;
}
