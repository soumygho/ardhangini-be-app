import { PartialType } from '@nestjs/mapped-types';
import { CreateProductpriceDto } from './create-productprice.dto';

export class UpdateProductpriceDto extends PartialType(CreateProductpriceDto) {}
