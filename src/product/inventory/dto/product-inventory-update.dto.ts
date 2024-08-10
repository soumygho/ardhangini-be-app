import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';
import { TransactionType } from '../enum/transaction-type.enum';

export class ProductInventoryUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  productId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  productTypeId: string;
  @ApiProperty()
  @ValidateIf((value) => value?.userId)
  @IsUUID()
  userId?: string;
  @ApiProperty({ required: false })
  invoiceRef: string;
  @ApiProperty()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
  @ApiProperty({
    enum: TransactionType,
    isArray: false,
    default: TransactionType.DEBIT,
  })
  @IsNotEmpty()
  transactionType: TransactionType;
  @ApiProperty({ required: false })
  orderId: string;
}
