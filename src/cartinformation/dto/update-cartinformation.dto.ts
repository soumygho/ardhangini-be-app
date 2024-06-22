import { PartialType } from '@nestjs/mapped-types';
import { CreateCartinformationDto } from './create-cartinformation.dto';

export class UpdateCartinformationDto extends PartialType(CreateCartinformationDto) {}
