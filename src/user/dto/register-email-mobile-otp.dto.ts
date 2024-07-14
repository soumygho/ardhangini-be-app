import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export enum OtpLoginType {
  EMAIL = 'email',
  MOBILE = 'mobile',
}
export class RegisterEmailMobileOtpDto {
  @ApiProperty({
    description: 'Otp Login Type should be email or mobile only',
    isArray: true,
    enum: OtpLoginType,
  })
  @IsEnum(OtpLoginType, { each: true })
  otpLoginType: OtpLoginType;

  @ValidateIf((o) => o.otpLoginType === OtpLoginType.EMAIL)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateIf((o) => o.otpLoginType === OtpLoginType.EMAIL)
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(10)
  @MaxLength(10)
  mobile: string;
}
