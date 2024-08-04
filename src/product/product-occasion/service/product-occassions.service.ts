import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ProductOccassionEntity } from '../entity/product-occassion.entity';
import { CreateProductOccassionDto } from '../dto/product-occassion.dto';

@Injectable()
export class ProductOccassionsService {
  constructor(
    @InjectRepository(ProductOccassionEntity)
    private readonly repository: Repository<ProductOccassionEntity>,
  ) {}

  async create(dto: CreateProductOccassionDto) {
    const entity: ProductOccassionEntity = this.repository.create();
    entity.name = dto.name;
    entity.description = dto.description;
    return await this.repository.save(entity);
  }

  async update(dto: CreateProductOccassionDto) {
    if (dto?.id && (await this.repository.existsBy({ id: dto.id }))) {
      const entity: CreateProductOccassionDto = this.repository.create();
      Object.assign(entity, dto);
      return await this.repository.save(entity);
    }
  }

  async findAll() {
    return await this.repository.find();
  }

  async delete(id: string) {
    return await this.repository.delete({ id });
  }
}
