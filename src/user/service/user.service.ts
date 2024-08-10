import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RegisterEmailPasswordDto } from '../dto/register-email-password.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserWithEmailPasswordTransaction } from '../transactions/register-user-with-email-password.transaction';
import { AccountStatus } from '../enum/user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userTransaction: RegisterUserWithEmailPasswordTransaction,
  ) {}
  async registerByEmailAndPassword(
    registerDto: RegisterEmailPasswordDto,
  ): Promise<UserEntity> {
    return await this.userTransaction.run(registerDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async update(updateUserDto: UpdateUserDto) {
    const userEntity = this.userRepository.create();
    userEntity.id = updateUserDto.userid;
    userEntity.dob = updateUserDto.dob;
    userEntity.firstName = updateUserDto.firstName;
    userEntity.lastName = updateUserDto.lastName;
    userEntity.email = updateUserDto.email;
    userEntity.mobile = updateUserDto.mobile;
    userEntity.accountStatus = AccountStatus.ACTIVE;
    userEntity.sex = updateUserDto.sex;
    return await this.userRepository.save(userEntity);
  }

  async remove(id: string) {
    return await this.userRepository.delete({ id: id });
  }
}
