import { ApiProperty } from '@nestjs/swagger';
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
import { Gender } from '../enum/gender.enum';

export class CreateUserDto {
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
