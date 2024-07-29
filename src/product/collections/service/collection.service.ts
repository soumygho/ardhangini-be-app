import { Repository } from 'typeorm';
import { ProductCollectionEntity } from '../entity/product-collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductCollectionDto } from '../dto/create-collection.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductCollectionService {
  constructor(
    @InjectRepository(ProductCollectionEntity)
    private readonly repository: Repository<ProductCollectionEntity>,
  ) {}

  async create(dto: CreateProductCollectionDto) {
    const entity: ProductCollectionEntity = this.repository.create();
    entity.name = dto.name;
    entity.description = dto.description;
    return await this.repository.save(entity);
  }

  async update(dto: CreateProductCollectionDto) {
    if (dto?.id && (await this.repository.existsBy({ id: dto.id }))) {
      const entity: ProductCollectionEntity = this.repository.create();
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
