import { PartialType } from '@nestjs/mapped-types';
import { Subcategory } from '../entities/subcategory.entity';

export class SubCategoryDto extends PartialType(Subcategory) {}
