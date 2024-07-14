import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RegisterEmailPasswordDto } from '../dto/register-email-password.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserWithEmailPasswordTransaction } from '../transactions/register-user-with-email-password.transaction';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userTransaction: RegisterUserWithEmailPasswordTransaction,
  ) {}
  async registerByEmailAndPassword(
    registerDto: RegisterEmailPasswordDto,
  ): Promise<User> {
    return await this.userTransaction.run(registerDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
