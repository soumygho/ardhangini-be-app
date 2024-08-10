import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';

export class UpdateDeliveryAddressDto {
  @ApiProperty({ required: false })
  @ValidateIf((address) => Boolean(address.addressId))
  @IsUUID()
  addressId?: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  addressLine1: string;
  @ApiProperty()
  @IsNotEmpty()
  addressLine2: string;
  @ApiProperty()
  @IsNotEmpty()
  pin: number;
  @ApiProperty()
  @IsNotEmpty()
  state: string;
  @ApiProperty()
  @IsNotEmpty()
  town: string;
  @ApiProperty()
  @IsNotEmpty()
  mobileNumber: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
