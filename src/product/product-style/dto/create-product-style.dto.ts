import { PartialType } from '@nestjs/mapped-types';
import { ProductStyleEntity } from '../entity/product-style.entity';

export class CreateProductStyleDto extends PartialType(ProductStyleEntity) {}
