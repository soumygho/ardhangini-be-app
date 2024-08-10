import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  isMobilePhone,
  IsNotEmpty,
  IsUUID,
  Validate,
  ValidateIf,
} from 'class-validator';
import {
  UserExistRuleType,
  UserExistsRule,
} from '../validator/user-exists-rule.validator';
import { Gender } from '../enum/gender.enum';

export class UpdateUserDto {
  @ApiProperty({
    required: true,
    example: '527785e5-8b02-4268-ac76-e4e74301608b',
  })
  @ValidateIf((value) => Boolean(value?.userid))
  @IsUUID()
  @IsNotEmpty()
  userid?: string;
  @ApiProperty({
    required: true,
    example: 'test@test.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: '9999999999',
  })
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({
    required: true,
    example: 'TestUser',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
    example: 'TestUser',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    required: true,
    example: '1993-08-30',
  })
  @IsDateString({ strict: true })
  dob: Date;

  @ApiProperty({
    enum: Gender,
    default: Gender.MALE,
    required: true,
  })
  @IsEnum(Gender, { each: true })
  sex: Gender;
}
