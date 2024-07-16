import { PartialType } from '@nestjs/mapped-types';
import { SubcategoryEntity } from '../entities/subcategory.entity';

export class SubCategoryDto extends PartialType(SubcategoryEntity) {}
