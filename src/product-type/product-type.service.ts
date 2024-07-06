import { Injectable } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { Repository } from 'typeorm';
import { ProductType } from './entities/product-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductType)
    private readonly productTypeRepository: Repository<ProductType>,
  ) {}
  async create(
    createProductTypeDto: CreateProductTypeDto,
  ): Promise<ProductType> {
    let productType: ProductType = new ProductType();
    Object.assign(productType, createProductTypeDto);
    productType.isActive = false;
    productType = await this.productTypeRepository.create(productType);
    return await this.productTypeRepository.save(productType);
  }

  async findAll(): Promise<ProductType[]> {
    return await this.productTypeRepository.find();
  }

  async findOne(id: string): Promise<ProductType> {
    return await this.productTypeRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateProductTypeDto: UpdateProductTypeDto,
  ): Promise<ProductType> {
    const existingProductType: ProductType = await this.findOne(id);
    let productType: ProductType = new ProductType();
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
