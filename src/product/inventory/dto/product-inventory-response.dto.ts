import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../enum/transaction-type.enum';

export class ProductInventoryResponseDto {
  @ApiProperty()
  transactionId: string;
  @ApiProperty()
  orderId: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  userEmail: string;
  @ApiProperty()
  userMobile: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty({ enum: TransactionType })
  transactionType: TransactionType;
  @ApiProperty()
  productName: string;
  @ApiProperty()
  productTypeId: string;
  @ApiProperty()
  productId: string;
  @ApiProperty()
  productTypeName: string;
  @ApiProperty()
  productThumbNail: string;
  @ApiProperty()
  transactionDate: Date;
  @ApiProperty()
  description: string;
  @ApiProperty()
  invoiceReference: string;
}
