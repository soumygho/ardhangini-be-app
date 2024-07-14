import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Validate,
} from 'class-validator';
import {
  UserExistRuleType,
  UserExistsRule,
} from '../validator/user-exists-rule.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enum/gender.enum';

export class RegisterEmailPasswordDto {
  @ApiProperty({
    required: true,
    example: 'test@test.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Validate(UserExistsRule, [UserExistRuleType.EMAIL, false], {})
  email: string;

  @ApiProperty({
    required: true,
    example: 'password',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: true,
    example: 'TestUser',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: '1993-08-30',
  })
  @IsDateString({ strict: true })
  dob: string;

  @ApiProperty({
    enum: Gender,
    default: Gender.MALE,
    required: true,
  })
  @IsEnum(Gender, { each: true })
  sex: Gender;
}
