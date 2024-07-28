import { PartialType } from '@nestjs/mapped-types';
import { PromoDetailsEntity } from '../entity/promo-details.entity';

export class CreatePromoDto extends PartialType(PromoDetailsEntity) {}
