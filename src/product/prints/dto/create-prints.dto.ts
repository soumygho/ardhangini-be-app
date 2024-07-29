import { PartialType } from '@nestjs/mapped-types';
import { ProductPrintsEntity } from '../entity/product-prints.entity';

export class CreateProductPrintDto extends PartialType(ProductPrintsEntity) {}
