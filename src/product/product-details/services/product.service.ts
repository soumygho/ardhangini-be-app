import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { DataSource } from 'typeorm';
import { RegisterOrUpdateProductTransaction } from '../transactions/register-product.transaction';
import { ProductTypeEntity } from 'src/product/product-type/entities/product-type.entity';
import { ProductTypes } from 'src/product/product-type/enum/product-type.enum';
import { SareeEntity } from '../entities';
import { SareeDetailsMapper } from '../mapper/saree-details.mapper';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { ProductSnapshotDto } from '../dto/product-snapshot.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly datasource: DataSource,
    private readonly productTransaction: RegisterOrUpdateProductTransaction,
    private readonly sareeDetailsMapper: SareeDetailsMapper,
  ) {}
  async createOrUpdate(createProductDto: CreateProductDto) {
    return await this.productTransaction.run(createProductDto);
  }

  async findAll(productTypeId: string, options: IPaginationOptions) {
    if (
      !(await this.datasource
        .getRepository(ProductTypeEntity)
        .existsBy({ id: productTypeId }))
    ) {
      throw new NotFoundException('Product Type not Found');
    }
    const productType: ProductTypeEntity = await this.datasource
      .getRepository(ProductTypeEntity)
      .findOneBy({ id: productTypeId });
    if (productType.name.toLowerCase() === ProductTypes.SAREE) {
      /*return (await this.datasource.getRepository(SareeEntity).find()).map(
        (sareeEntity) => this.sareeDetailsMapper.mapFrom(sareeEntity),
      );*/
      return paginate<SareeEntity>(
        this.datasource.getRepository(SareeEntity),
        options,
      );
    }
  }

  async findAllWithoutPaging(productTypeId: string) {
    if (
      !(await this.datasource
        .getRepository(ProductTypeEntity)
        .existsBy({ id: productTypeId }))
    ) {
      throw new NotFoundException('Product Type not Found');
    }
    const productType: ProductTypeEntity = await this.datasource
      .getRepository(ProductTypeEntity)
      .findOneBy({ id: productTypeId });
    if (productType.name.toLowerCase() === ProductTypes.SAREE) {
      /*return (await this.datasource.getRepository(SareeEntity).find()).map(
        (sareeEntity) => this.sareeDetailsMapper.mapFrom(sareeEntity),
      );*/
      return await this.datasource.getRepository(SareeEntity).find();
    }
  }

  async findOne(productTypeId: string, id: string) {
    if (
      !(await this.datasource
        .getRepository(ProductTypeEntity)
        .existsBy({ id: productTypeId }))
    ) {
      throw new NotFoundException('Product Type not Found');
    }
    const productType: ProductTypeEntity = await this.datasource
      .getRepository(ProductTypeEntity)
      .findOneBy({ id: productTypeId });
    if (productType.name.toLowerCase() === ProductTypes.SAREE) {
      if (
        !(await this.datasource.getRepository(SareeEntity).existsBy({ id }))
      ) {
        throw new NotFoundException('Product Type not Found');
      }
      return this.sareeDetailsMapper.mapFrom(
        await this.datasource.getRepository(SareeEntity).findOneBy({ id }),
      );
    }
  }

  async remove(productTypeId: string, id: string) {
    if (
      !(await this.datasource
        .getRepository(ProductTypeEntity)
        .existsBy({ id: productTypeId }))
    ) {
      throw new NotFoundException('Product Type not Found');
    }
    const productType: ProductTypeEntity = await this.datasource
      .getRepository(ProductTypeEntity)
      .findOneBy({ id: productTypeId });
    if (productType.name.toLowerCase() === ProductTypes.SAREE) {
      if (
        !(await this.datasource.getRepository(SareeEntity).existsBy({ id }))
      ) {
        throw new NotFoundException('Product Type not Found');
      }
      return await this.datasource.getRepository(SareeEntity).delete({ id });
    }
  }
}
