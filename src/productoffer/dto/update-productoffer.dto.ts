import { PartialType } from '@nestjs/mapped-types';
import { CreateProductofferDto } from './create-productoffer.dto';

export class UpdateProductofferDto extends PartialType(CreateProductofferDto) {}
