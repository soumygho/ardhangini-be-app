import { BaseTransaction } from '../../common/entity/BaseTransaction';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { RegisterEmailPasswordDto } from '../dto/register-email-password.dto';
import { UserEntity } from '../entities/user.entity';
import { UserLoginDetailsEntity } from '../entities/user-login.entity';
import * as bcrypt from 'bcrypt';
import { LoginType } from '../enum/user.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUserWithEmailPasswordTransaction extends BaseTransaction<
  RegisterEmailPasswordDto,
  UserEntity
> {
  constructor(private readonly datasource: DataSource) {
    super(datasource);
  }
  saltOrRounds: number = 10;

  protected async execute(
    data: RegisterEmailPasswordDto,
    manager: EntityManager,
  ): Promise<UserEntity | null> {
    const userRepository: Repository<UserEntity> =
      await manager.getRepository(UserEntity);
    const userLoginRepository: Repository<UserLoginDetailsEntity> =
      await manager.getRepository(UserLoginDetailsEntity);
    let user: UserEntity = new UserEntity();
    Object.assign(user, data);
    user = await userRepository.create(user);
    user = await userRepository.save(user);
    const userLoginDetails: UserLoginDetailsEntity =
      new UserLoginDetailsEntity();
    userLoginDetails.user = user;
    userLoginDetails.logintype = LoginType.EMAIL;
    userLoginDetails.password = await bcrypt.hash(
      data.password,
      this.saltOrRounds,
    );
    await userLoginRepository.save(userLoginDetails);
    return user;
  }
}
