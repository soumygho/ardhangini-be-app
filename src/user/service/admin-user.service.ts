import { InjectRepository } from '@nestjs/typeorm';
import { AdminUserEntity } from '../entities/admin-user.entity';
import { Repository } from 'typeorm';
import { UpdateAdminUserDto } from '../dto/admin/update-admin-user.dto';
import { BadRequestException } from '@nestjs/common';

export class AdminUserService {
  constructor(
    @InjectRepository(AdminUserEntity)
    private readonly adminUserRepository: Repository<AdminUserEntity>,
  ) {}

  async createOrUpdateAdminUser(dto: UpdateAdminUserDto) {
    const adminUserEntity = this.adminUserRepository.create();
    Object.assign(adminUserEntity, dto);
    if (dto?.id) {
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
