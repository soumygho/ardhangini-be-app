import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import {
  UserExistRuleType,
  UserExistsRule,
} from '../validator/user-exists-rule.validator';
import { ApiProperty } from '@nestjs/swagger';

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
    example: 'password',
  })
  @IsNotEmpty()
  repeatPassword: string;

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
}
