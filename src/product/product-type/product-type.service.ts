import { Injectable } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { Repository } from 'typeorm';
import { ProductTypeEntity } from './entities/product-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiOkResponse } from '@nestjs/swagger';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductTypeEntity)
    private readonly productTypeRepository: Repository<ProductTypeEntity>,
  ) {}
  async create(
    createProductTypeDto: CreateProductTypeDto,
  ): Promise<ProductTypeEntity> {
    let productType: ProductTypeEntity = new ProductTypeEntity();
    Object.assign(productType, createProductTypeDto);
    productType.isActive = false;
    productType = await this.productTypeRepository.create(productType);
    return await this.productTypeRepository.save(productType);
  }
  @ApiOkResponse({
    description: 'All fabric Response',
    type: ProductTypeEntity,
    isArray: true,
  })
  async findAll(): Promise<ProductTypeEntity[]> {
    return await this.productTypeRepository.find();
  }

  async findOne(id: string): Promise<ProductTypeEntity> {
    return await this.productTypeRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateProductTypeDto: UpdateProductTypeDto,
  ): Promise<ProductTypeEntity> {
    const existingProductType: ProductTypeEntity = await this.findOne(id);
    let productType: ProductTypeEntity = new ProductTypeEntity();
    Object.assign(productType, updateProductTypeDto);
    productType.id = id;
    productType.isActive = existingProductType.isActive;
    productType = await this.productTypeRepository.create(productType);
    return await this.productTypeRepository.save(productType);
  }

  async remove(id: string): Promise<{ affected?: number }> {
    return await this.productTypeRepository.delete(id);
  }
}
