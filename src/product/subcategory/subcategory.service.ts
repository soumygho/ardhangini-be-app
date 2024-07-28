import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubcategoryEntity } from './entities/subcategory.entity';
import { DataSource, Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from '../category/entities/category.entity';
import { entities } from 'src/entities';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(SubcategoryEntity)
    private readonly subCategoryRepository: Repository<SubcategoryEntity>,
    private readonly categoryService: CategoryService,
    private readonly datasource: DataSource,
  ) {}
  async create(
    createSubcategoryDto: CreateSubcategoryDto,
  ): Promise<SubcategoryEntity> {
    const category: CategoryEntity = await this.getCategory(
      createSubcategoryDto.categoryid,
    );
    if (category !== undefined) {
      let subCategory: SubcategoryEntity = new SubcategoryEntity();
      Object.assign(subCategory, createSubcategoryDto);
      subCategory.isActive = false;
      subCategory.category = category;
      subCategory = this.subCategoryRepository.create(subCategory);
      return this.subCategoryRepository.save(subCategory);
    } else {
      throw new NotFoundException(
        `Category with id ${createSubcategoryDto.categoryid} not found.`,
      );
    }
  }

  findAll() {
    return this.subCategoryRepository.find({
      relations: {
        category: true,
      },
    });
  }

  async findOne(id: string): Promise<SubcategoryEntity> {
    return await this.subCategoryRepository.findOne({
      where: [{ id: id }],
      relations: {
        category: true,
      },
    });
  }

  async findByCategory(categoryId: string): Promise<SubcategoryEntity[]> {
    const category: CategoryEntity = await this.getCategory(categoryId);
    if (category !== undefined) {
      let subCategories: SubcategoryEntity[] = await this.datasource
        .getRepository(SubcategoryEntity)
        .createQueryBuilder('subcategory')
        .where('subcategory.category_id = :categoryId', { categoryId })
        .getMany();
      subCategories = subCategories.map((subCategory) => {
        subCategory.category = category;
        return subCategory;
      });
      return subCategories;
    } else {
      throw new NotFoundException(`Category with id ${categoryId} not found.`);
    }
  }

  async update(
    id: string,
    updateSubcategoryDto: UpdateSubcategoryDto,
  ): Promise<SubcategoryEntity> {
    const existingSubcategory: SubcategoryEntity = await this.findOne(id);
    if (existingSubcategory === undefined) {
      throw new NotFoundException(`SubCategory with id ${id} not found.`);
    }
    const subCategory: SubcategoryEntity = new SubcategoryEntity();
    Object.assign(subCategory, updateSubcategoryDto);
    subCategory.id = id;
    subCategory.isActive = existingSubcategory.isActive;
    return await this.subCategoryRepository.save(subCategory);
  }

  async remove(id: string): Promise<{ affected?: number }> {
    return await this.subCategoryRepository.delete(id);
  }

  private async getCategory(categoryId: string): Promise<CategoryEntity> {
    return this.categoryService.findOne(categoryId);
  }
}
