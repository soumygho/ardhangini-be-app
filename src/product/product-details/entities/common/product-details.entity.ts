import { Column } from 'typeorm';
import { BaseEntity } from '../../../../common';
import { ApiProperty } from '@nestjs/swagger';

export abstract class ProductDetailsEntity extends BaseEntity {
  @ApiProperty()
  @Column({ name: 'is_best_seller', nullable: true, default: false })
  isBestSeller: boolean;
}
