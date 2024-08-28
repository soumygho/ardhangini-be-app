import { InjectRepository } from '@nestjs/typeorm';
import { AdminUserEntity } from '../entities/admin-user.entity';
import { Repository } from 'typeorm';
import { UpdateAdminUserDto } from '../dto/admin/update-admin-user.dto';
import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminUserService implements OnModuleInit {
  constructor(
    @InjectRepository(AdminUserEntity)
    private readonly adminUserRepository: Repository<AdminUserEntity>,
  ) {}

  async onModuleInit() {
    const adminUser = await this.adminUserRepository.findOneBy({
      name: 'Super Admin',
    });
    if (!adminUser) {
      const dto: UpdateAdminUserDto = {
        id: undefined,
        name: 'Super Admin',
        userName: 'super-admin',
        password: 'password',
        role: ['admin'],
      };
      await this.createOrUpdateAdminUser(dto);
    }
  }

  async createOrUpdateAdminUser(dto: UpdateAdminUserDto) {
    const adminUserEntity = this.adminUserRepository.create();
    Object.assign(adminUserEntity, dto);
    adminUserEntity.password = await bcrypt.hash(dto.password, 10);
    if (dto?.id && dto.id !== '') {
      if (!(await this.adminUserRepository.existsBy({ id: dto?.id }))) {
        throw new BadRequestException('User not found');
      }
    }
    return await this.adminUserRepository.save(dto);
  }

  async getAllAdminUsers() {
    return await this.adminUserRepository.find();
  }

  async deleteAdminUser(userId: string) {
    return await this.adminUserRepository.delete({ id: userId });
  }
}
