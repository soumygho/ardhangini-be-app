import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

export enum UserExistRuleType {
  ID = 'id',
  EMAIL = 'email',
  MOBILE = 'mobile',
}

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    console.trace(
      'UserExistsRule: validationArguments : ' +
        JSON.stringify(validationArguments),
    );
    console.trace('UserExistsRule: value : ' + JSON.stringify(value));
    let userExistRuleType: UserExistRuleType = UserExistRuleType.ID;
    let existsCheck = true;
    if (
      validationArguments &&
      validationArguments.constraints &&
      validationArguments.constraints.length == 2
    ) {
      userExistRuleType = validationArguments.constraints[0];
      existsCheck = validationArguments.constraints[1];
    }

    switch (userExistRuleType) {
      case UserExistRuleType.ID: {
        return this.userExistById(value, existsCheck);
      }
      case UserExistRuleType.EMAIL: {
        return this.userExistByEmail(value, existsCheck);
      }
      case UserExistRuleType.MOBILE: {
        return this.userExistByMobile(value, existsCheck);
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return validationArguments !== undefined &&
      validationArguments.constraints !== undefined &&
      validationArguments.constraints[1]
      ? "User doesn't exist"
      : 'User already exist';
  }

  async userExistById(id: string, existCheck: boolean) {
    const user: UserEntity = await this.userRepository.findOneBy({ id });
    if (existCheck) {
      return user !== null;
    }
    return user === null;
  }

  async userExistByEmail(email: string, existCheck: boolean) {
    const user: UserEntity = await this.userRepository.findOneBy({ email });
    if (existCheck) {
      return user !== null;
    }
    return user === null;
  }

  async userExistByMobile(mobile: string, existCheck: boolean) {
    const user: UserEntity = await this.userRepository.findOneBy({ mobile });
    if (existCheck) {
      return user !== null;
    }
    return user === null;
  }
}
