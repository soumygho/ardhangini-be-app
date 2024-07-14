import { BaseTransaction } from '../../common/entity/BaseTransaction';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { RegisterEmailPasswordDto } from '../dto/register-email-password.dto';
import { User } from '../entities/user.entity';
import { UserLoginDetails } from '../entities/user-login.entity';
import * as bcrypt from 'bcrypt';
import { LoginType } from '../enum/user.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUserWithEmailPasswordTransaction extends BaseTransaction<
  RegisterEmailPasswordDto,
  User
> {
  constructor(private readonly datasource: DataSource) {
    super(datasource);
  }
  saltOrRounds: number = 10;

  protected async execute(
    data: RegisterEmailPasswordDto,
    manager: EntityManager,
  ): Promise<User | null> {
    const userRepository: Repository<User> = await manager.getRepository(User);
    const userLoginRepository: Repository<UserLoginDetails> =
      await manager.getRepository(UserLoginDetails);
    let user: User = new User();
    Object.assign(user, data);
    user = await userRepository.create(user);
    user = await userRepository.save(user);
    const userLoginDetails: UserLoginDetails = new UserLoginDetails();
    userLoginDetails.user = user;
    userLoginDetails.logintype = LoginType.EMAIL;
    userLoginDetails.accessToken = await bcrypt.hash(
      data.password,
      this.saltOrRounds,
    );
    await userLoginRepository.save(userLoginDetails);
    return user;
  }
}
