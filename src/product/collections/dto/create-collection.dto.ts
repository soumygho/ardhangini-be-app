import { PartialType } from '@nestjs/mapped-types';
import { ProductCollectionEntity } from '../entity/product-collection.entity';

export class CreateProductCollectionDto extends PartialType(
  ProductCollectionEntity,
) {}
