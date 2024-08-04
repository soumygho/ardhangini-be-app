import { PartialType } from '@nestjs/mapped-types';
import { ProductOccassionEntity } from '../entity/product-occassion.entity';

export class CreateProductOccassionDto extends PartialType(
  ProductOccassionEntity,
) {}
