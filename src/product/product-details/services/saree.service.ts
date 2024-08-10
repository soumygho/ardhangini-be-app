import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import {
  Between,
  DataSource,
  FindManyOptions,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
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
import { ProductSnapshotWithUserDto } from '../dto/product-snapshot-with-user.dto';

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

    let entities: any[] = [];
    if (dto && dto?.filters && dto?.filters?.length > 0) {
      const sareeIds = await this.buildSareeSearchOptions(dto.filters);
      console.log('sareeIds');
      console.log(sareeIds);
      if (sareeIds && sareeIds?.length > 0) {
        entities = await this.sareeRepository.find({
          where: {
            id: In(sareeIds),
          },
        });
        console.trace('entities : ');
        console.trace(entities);
        entities = entities.map(
          async (sareeEntity) =>
            await this.sareeMapper.mapAndEnrichWithUserData(
              dto?.userId,
              sareeEntity,
            ),
        );
      }
    } else {
      entities = await this.sareeRepository.find();
      entities = entities.map(async (sareeEntity) => {
        return await this.sareeMapper.mapAndEnrichWithUserData(
          dto?.userId,
          sareeEntity,
        );
      });
    }
    return await Promise.all(entities);
  }

  private async buildSareeSearchOptions(filters: SareeFilter[]) {
    const sareeQueryBuilder = this.sareeRepository
      .createQueryBuilder('saree')
      .select('saree');
    if (!filters || filters?.length === 0) {
      return [];
    }
    await Promise.all(
      filters?.map(async (filter) => {
        if (
          filter?.filterType === FilterType.CATEGORY &&
          filter?.values?.length > 0
        ) {
          const categoryRepo: Repository<CategoryEntity> =
            this.dataSource.getRepository(CategoryEntity);
          const categories = await categoryRepo.findBy({
            id: In(filter.values),
          });
          if (categories && categories.length > 0) {
            sareeQueryBuilder.andWhere(
              this.getInClause('saree.category_id IN (', filters),
            );
          }
        }
        if (
          filter?.filterType === FilterType.SUBCATEGORY &&
          filter?.values?.length > 0
        ) {
          const repo: Repository<SubcategoryEntity> =
            this.dataSource.getRepository(SubcategoryEntity);
          const filters = await repo.findBy({ id: In(filter.values) });
          console.trace('filters : ');
          console.trace(filters);
          if (filters && filters.length > 0) {
            sareeQueryBuilder.andWhere(
              this.getInClause('saree.subcategory_id IN (', filters),
            );
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
            sareeQueryBuilder.andWhere(
              this.getInClause('saree.collection_id IN (', filters),
            );
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
            sareeQueryBuilder.andWhere(
              this.getInClause('saree.color_id IN (', filters),
            );
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
            sareeQueryBuilder.andWhere(
              this.getInClause('saree.category_id IN (', filters),
            );
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
            sareeQueryBuilder.andWhere(
              this.getInClause('saree.occassion_id IN (', filters),
            );
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
            sareeQueryBuilder.andWhere(
              this.getInClause('saree.print_id IN (', filters),
            );
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
            sareeQueryBuilder.andWhere(
              this.getInClause('saree.style_id IN (', filters),
            );
          }
        }
        if (
          filter?.filterType === FilterType.PRICE &&
          filter?.maxValue &&
          filter?.minValue
        ) {
          sareeQueryBuilder.andWhere(
            'saree.offer_price >= :minValue AND saree.offer_price <= :maxValue',
            {
              minValue: filter.minValue,
              maxValue: filter.maxValue,
            },
          );
        }
        if (filter?.filterType === FilterType.EXCLUSIVE) {
          sareeQueryBuilder.andWhere('saree.is_exclusive = :isExclusive', {
            isExclusive: true,
          });
        }
        if (filter?.filterType === FilterType.TRENDING) {
          sareeQueryBuilder.andWhere('saree.is_trending = true');
        }
        if (filter?.filterType === FilterType.BESTSELLER) {
          sareeQueryBuilder.andWhere('saree.is_best_seller = true');
        }
        if (filter?.filterType === FilterType.SHIPPABLE) {
          sareeQueryBuilder.andWhere('saree.is_shippable = true');
        }
      }),
    );
    const entities = await sareeQueryBuilder.getMany();
    console.trace(entities);
    return entities?.map((entity) => entity?.id);
  }

  private getInClause(query, filters: any[]) {
    let whereStmt = query;
    let i = 0;
    filters?.forEach((filter) => {
      whereStmt = whereStmt + "'" + filter.id + "'";
      if (i < filters?.length - 1) {
        whereStmt = whereStmt + ',';
      }
      ++i;
    });
    whereStmt = whereStmt + ')';
    console.trace(whereStmt);
    return whereStmt;
  }
}
