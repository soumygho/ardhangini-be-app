import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Between, DataSource, FindManyOptions, In, Repository } from 'typeorm';
import { SareeEntity } from '../entities';
import { SareeDetailsMapper } from '../mapper/saree-details.mapper';
import { FilterType, SareeFilter, SareeFilterDto } from '../dto/saree-filter';
import { CategoryEntity } from 'src/product/category/entities/category.entity';
import { SubcategoryEntity } from 'src/product/subcategory/entities/subcategory.entity';
import { ProductCollectionEntity } from 'src/product/collections/entity/product-collection.entity';
import { ProductColorEntity } from 'src/product/colours/entity/product-colour.entity';
import { ProductOccassionEntity } from 'src/product/product-occasion/entity/product-occassion.entity';
import { ProductPrintsEntity } from 'src/product/prints/entity/product-prints.entity';
import { ProductStyleEntity } from 'src/product/product-style/entity/product-style.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SareeService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(SareeEntity)
    private readonly sareeRepository: Repository<SareeEntity>,
    private readonly sareeMapper: SareeDetailsMapper,
  ) {}

  async getAll(request: Request, dto: SareeFilterDto) {
    if (request.params['user']) {
      //authenticated user
    }

    if (dto && dto?.filters && dto?.filters?.length > 0) {
      const whereOptions = this.buildSareeSearchOptions(dto.filters);
      if (whereOptions) {
        return (await this.sareeRepository.find(whereOptions)).map(
          (sareeEntity) =>
            this.sareeMapper.mapAndEnrichWithUserData(dto?.userId, sareeEntity),
        );
      }
    }

    return (await this.sareeRepository.find()).map((sareeEntity) =>
      this.sareeMapper.mapAndEnrichWithUserData(dto?.userId, sareeEntity),
    );
  }

  private buildSareeSearchOptions(filters: SareeFilter[]) {
    let criteria: FindManyOptions<SareeEntity> = undefined;
    if (!filters || filters?.length === 0) {
      return criteria;
    }
    let whereCondition = {};
    let isFilterApplied = false;
    filters?.forEach(async (filter) => {
      if (
        filter?.filterType === FilterType.CATEGORY &&
        filter?.values?.length > 0
      ) {
        const categoryRepo: Repository<CategoryEntity> =
          this.dataSource.getRepository(CategoryEntity);
        const categories = await categoryRepo.findBy({ id: In(filter.values) });
        if (categories && categories.length > 0) {
          isFilterApplied = true;
          whereCondition = { ...whereCondition, category: In(categories) };
        }
      }
      if (
        filter?.filterType === FilterType.SUBCATEGORY &&
        filter?.values?.length > 0
      ) {
        const repo: Repository<SubcategoryEntity> =
          this.dataSource.getRepository(SubcategoryEntity);
        const filters = await repo.findBy({ id: In(filter.values) });
        if (filters && filters.length > 0) {
          isFilterApplied = true;
          whereCondition = { ...whereCondition, subCategory: In(filters) };
        }
      }
      if (
        filter?.filterType === FilterType.COLLECTION &&
        filter?.values?.length > 0
      ) {
        const repo: Repository<ProductCollectionEntity> =
          this.dataSource.getRepository(ProductCollectionEntity);
        const filters = await repo.findBy({ id: In(filter.values) });
        if (filters && filters.length > 0) {
          isFilterApplied = true;
          whereCondition = { ...whereCondition, collection: In(filters) };
        }
      }
      if (
        filter?.filterType === FilterType.COLOR &&
        filter?.values?.length > 0
      ) {
        const repo: Repository<ProductColorEntity> =
          this.dataSource.getRepository(ProductColorEntity);
        const filters = await repo.findBy({ id: In(filter.values) });
        if (filters && filters.length > 0) {
          isFilterApplied = true;
          whereCondition = { ...whereCondition, colour: In(filters) };
        }
      }
      if (
        filter?.filterType === FilterType.FABRIC &&
        filter?.values?.length > 0
      ) {
        const repo: Repository<CategoryEntity> =
          this.dataSource.getRepository(CategoryEntity);
        const filters = await repo.findBy({ id: In(filter.values) });
        if (filters && filters.length > 0) {
          isFilterApplied = true;
          whereCondition = { ...whereCondition, category: In(filters) };
        }
      }
      if (
        filter?.filterType === FilterType.OCCASSION &&
        filter?.values?.length > 0
      ) {
        const repo: Repository<ProductOccassionEntity> =
          this.dataSource.getRepository(ProductOccassionEntity);
        const filters = await repo.findBy({ id: In(filter.values) });
        if (filters && filters.length > 0) {
          isFilterApplied = true;
          whereCondition = { ...whereCondition, occassion: In(filters) };
        }
      }
      if (
        filter?.filterType === FilterType.PRINT &&
        filter?.values?.length > 0
      ) {
        const repo: Repository<ProductPrintsEntity> =
          this.dataSource.getRepository(ProductPrintsEntity);
        const filters = await repo.findBy({ id: In(filter.values) });
        if (filters && filters.length > 0) {
          isFilterApplied = true;
          whereCondition = { ...whereCondition, print: In(filters) };
        }
      }
      if (
        filter?.filterType === FilterType.STYLE &&
        filter?.values?.length > 0
      ) {
        const repo: Repository<ProductStyleEntity> =
          this.dataSource.getRepository(ProductStyleEntity);
        const filters = await repo.findBy({ id: In(filter.values) });
        if (filters && filters.length > 0) {
          isFilterApplied = true;
          whereCondition = { ...whereCondition, style: In(filters) };
        }
      }
      if (
        filter?.filterType === FilterType.PRICE &&
        filter?.maxValue &&
        filter?.minValue
      ) {
        isFilterApplied = true;
        whereCondition = {
          ...whereCondition,
          offerprice: Between(filter.minValue, filter.maxValue),
        };
      }
      if (filter?.filterType === FilterType.EXCLUSIVE) {
        isFilterApplied = true;
        whereCondition = {
          ...whereCondition,
          isExclusive: true,
        };
      }
      if (filter?.filterType === FilterType.TRENDING) {
        isFilterApplied = true;
        whereCondition = {
          ...whereCondition,
          isTrending: true,
        };
      }
      if (filter?.filterType === FilterType.BESTSELLER) {
        isFilterApplied = true;
        whereCondition = {
          ...whereCondition,
          isBestSeller: true,
        };
      }
    });
    if (isFilterApplied) {
      criteria = { where: whereCondition };
    }
    return criteria;
  }
}
