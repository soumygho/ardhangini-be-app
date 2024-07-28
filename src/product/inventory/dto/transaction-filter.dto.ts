import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsUUID, ValidateIf } from 'class-validator';

export enum InventoryTransactionFilterType {
  BYDATE = 'by-date',
  BYORDER = 'by-order',
  BYPRODUCT = 'by-product',
}
export class InventoryTransactionFilter {
  @ApiProperty({
    enum: InventoryTransactionFilterType,
    example: InventoryTransactionFilterType.BYDATE,
    required: true,
  })
  filterType: InventoryTransactionFilterType;
  @ValidateIf(
    (filter) => filter.filterType === InventoryTransactionFilterType.BYDATE,
  )
  @IsDate()
  startDate: Date;

  @ValidateIf(
    (filter) => filter.filterType === InventoryTransactionFilterType.BYDATE,
  )
  @IsDate()
  endDate: Date;

  @ValidateIf(
    (filter) => filter.filterType === InventoryTransactionFilterType.BYORDER,
  )
  @IsUUID()
  orderId: string;

  @ValidateIf(
    (filter) => filter.filterType === InventoryTransactionFilterType.BYPRODUCT,
  )
  @IsUUID()
  productId: string;
}
