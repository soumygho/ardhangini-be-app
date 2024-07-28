import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category: CategoryEntity = new CategoryEntity();
    category.description = createCategoryDto.description;
    category.name = createCategoryDto.name;
    category.isActive = false;
    return this.categoryRepository.save(category);
  }

  async findAll(options: IPaginationOptions): Promise<CategoryEntity[]> {
    //return paginate<CategoryEntity>(this.categoryRepository, options);
    return await this.categoryRepository.find();
  }

  findOne(id: string): Promise<CategoryEntity> {
    return this.categoryRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const existingCategory: CategoryEntity = await this.findOne(id);
    if (existingCategory === undefined) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    const category: CategoryEntity = new CategoryEntity();
    category.description = updateCategoryDto.description;
    category.name = updateCategoryDto.name;
    category.isActive = existingCategory.isActive;
    category.id = id;
    return this.categoryRepository.save(category);
  }

  remove(id: string): Promise<{ affected?: number }> {
    return this.categoryRepository.delete(id);
  }
}
