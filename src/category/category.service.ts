import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category: Category = new Category();
    category.description = createCategoryDto.description;
    category.name = createCategoryDto.name;
    category.isActive = false;
    return this.categoryRepository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category: Category = new Category();
    category.description = updateCategoryDto.description;
    category.name = updateCategoryDto.name;
    category.id = id;
    return this.categoryRepository.save(category);
  }

  remove(id: string): Promise<{ affected?: number }> {
    return this.categoryRepository.delete(id);
  }
}
