import { PartialType } from '@nestjs/mapped-types';
import { ProductColorEntity } from '../entity/product-colour.entity';

export class CreateProductColorDto extends PartialType(ProductColorEntity) {}
