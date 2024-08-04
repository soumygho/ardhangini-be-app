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
}

export class SareeFilter {
  @ApiProperty({
    enum: FilterType,
    required: true,
    default: FilterType.NONE,
  })
  filterType: FilterType;
  @ApiProperty()
  minValue: string | number;
  @ApiProperty()
  maxValue: string | number;
}

export class SareeFilterDto {
  @ApiProperty({ type: SareeFilter, isArray: true })
  filters: SareeFilter[];
}
