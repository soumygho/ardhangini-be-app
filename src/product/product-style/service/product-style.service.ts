import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateProductStyleDto } from '../dto/create-product-style.dto';
import { ProductStyleEntity } from '../entity/product-style.entity';

@Injectable()
export class ProductStyleService {
  constructor(
    @InjectRepository(ProductStyleEntity)
    private readonly repository: Repository<ProductStyleEntity>,
  ) {}

  async create(dto: CreateProductStyleDto) {
    const entity: ProductStyleEntity = this.repository.create();
    entity.name = dto.name;
    entity.description = dto.description;
    return await this.repository.save(entity);
  }

  async update(dto: CreateProductStyleDto) {
    if (dto?.id && (await this.repository.existsBy({ id: dto.id }))) {
      const entity: ProductStyleEntity = this.repository.create();
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
