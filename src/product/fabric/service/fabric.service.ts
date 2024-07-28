import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FabricDetailsEntity } from '../entity/fabric-details.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFabricDto } from '../dto/create-fabric.dto';

@Injectable()
export class FabricService {
  constructor(
    @InjectRepository(FabricDetailsEntity)
    private readonly fabricRepository: Repository<FabricDetailsEntity>,
  ) {}

  async create(dto: CreateFabricDto) {
    const fabricEntity: FabricDetailsEntity = this.fabricRepository.create();
    Object.assign(fabricEntity, dto);
    return this.fabricRepository.save(fabricEntity);
  }

  async update(id: string, dto: CreateFabricDto) {
    if (!(await this.fabricRepository.existsBy({ id: id }))) {
      throw new NotFoundException('Fabric details not found');
    }
    const fabricEntity: FabricDetailsEntity = this.fabricRepository.create();
    Object.assign(fabricEntity, dto);
    fabricEntity.id = id;
    return this.fabricRepository.save(fabricEntity);
  }

  async getById(fabricId: string) {
    return this.fabricRepository.findOneBy({ id: fabricId });
  }

  async getAll() {
    return this.fabricRepository.find();
  }

  async delete(fabricId: string) {
    if (!(await this.fabricRepository.existsBy({ id: fabricId }))) {
      throw new NotFoundException('Fabric details not found');
    }
    return this.fabricRepository.delete({ id: fabricId });
  }
}
