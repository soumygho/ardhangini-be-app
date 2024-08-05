import { ApiProperty } from '@nestjs/swagger';

export enum FilterType {
  NONE = 'none',
  CATEGORY = 'category',
  SUBCATEGORY = 'subcategory',
  PRICE = 'price',
  FABRIC = 'fabric',
  COLLECTION = 'collection',
  COLOR = 'color',
  STYLE = 'style',
  PRINT = 'print',
  EXCLUSIVE = 'exclusive',
  OCCASSION = 'occassion',
  BESTSELLER = 'bestseller',
  TRENDING = 'trending',
}

export class SareeFilter {
  @ApiProperty({
    enum: FilterType,
    required: true,
    default: FilterType.NONE,
  })
  filterType: FilterType;
  @ApiProperty({ required: false })
  minValue: string | number;
  @ApiProperty({ required: false })
  maxValue: string | number;
  @ApiProperty({ required: false })
  values: string[];
}

export class SareeFilterDto {
  @ApiProperty({
    required: false,
  })
  userId: string;
  @ApiProperty({ type: SareeFilter, isArray: true, required: false })
  filters: SareeFilter[];
}
