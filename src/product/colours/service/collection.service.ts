import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ProductColorEntity } from '../entity/product-colour.entity';
import { CreateProductColorDto } from '../dto/create-color.dto';

@Injectable()
export class ProductColorService {
  constructor(
    @InjectRepository(ProductColorEntity)
    private readonly repository: Repository<ProductColorEntity>,
  ) {}

  async create(dto: CreateProductColorDto) {
    const entity: ProductColorEntity = this.repository.create();
    entity.name = dto.name;
    return await this.repository.save(entity);
  }

  async update(dto: CreateProductColorDto) {
    if (dto?.id && (await this.repository.existsBy({ id: dto.id }))) {
      const entity: CreateProductColorDto = this.repository.create();
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
