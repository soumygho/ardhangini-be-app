import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RegisterEmailPasswordDto } from '../dto/register-email-password.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserWithEmailPasswordTransaction } from '../transactions/register-user-with-email-password.transaction';

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

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
