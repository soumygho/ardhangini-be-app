import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { DataSource, Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subCategoryRepository: Repository<Subcategory>,
    private readonly categoryService: CategoryService,
    private readonly datasource: DataSource,
  ) {}
  async create(
    createSubcategoryDto: CreateSubcategoryDto,
  ): Promise<Subcategory> {
    const category: Category = await this.getCategory(
      createSubcategoryDto.categoryid,
    );
    if (category !== undefined) {
      let subCategory: Subcategory = new Subcategory();
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

  async findOne(id: string): Promise<Subcategory> {
    return await this.subCategoryRepository.findOne({
      where: [{ id: id }],
      relations: {
        category: true,
      },
    });
  }

  async findByCategory(categoryId: string): Promise<Subcategory[]> {
    const category: Category = await this.getCategory(categoryId);
    if (category !== undefined) {
      return await this.datasource
        .getRepository(Subcategory)
        .createQueryBuilder('subcategory')
        .where('subcategory.category_id = :categoryId', { categoryId })
        .getMany();
    } else {
      throw new NotFoundException(`Category with id ${categoryId} not found.`);
    }
  }

  async update(
    id: string,
    updateSubcategoryDto: UpdateSubcategoryDto,
  ): Promise<Subcategory> {
    const existingSubcategory: Subcategory = await this.findOne(id);
    if (existingSubcategory === undefined) {
      throw new NotFoundException(`SubCategory with id ${id} not found.`);
    }
    const subCategory: Subcategory = new Subcategory();
    Object.assign(subCategory, updateSubcategoryDto);
    subCategory.id = id;
    subCategory.isActive = existingSubcategory.isActive;
    return await this.subCategoryRepository.save(subCategory);
  }

  async remove(id: string): Promise<{ affected?: number }> {
    return await this.subCategoryRepository.delete(id);
  }

  private async getCategory(categoryId: string): Promise<Category> {
    return this.categoryService.findOne(categoryId);
  }
}
