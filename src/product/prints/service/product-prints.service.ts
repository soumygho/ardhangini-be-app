import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ProductPrintsEntity } from '../entity/product-prints.entity';
import { CreateProductPrintDto } from '../dto/create-prints.dto';

@Injectable()
export class ProductPrintsService {
  constructor(
    @InjectRepository(ProductPrintsEntity)
    private readonly repository: Repository<ProductPrintsEntity>,
  ) {}

  async create(dto: CreateProductPrintDto) {
    const entity: ProductPrintsEntity = this.repository.create();
    entity.name = dto.name;
    entity.description = dto.description;
    return await this.repository.save(entity);
  }

  async update(dto: CreateProductPrintDto) {
    if (dto?.id && (await this.repository.existsBy({ id: dto.id }))) {
      const entity: CreateProductPrintDto = this.repository.create();
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
