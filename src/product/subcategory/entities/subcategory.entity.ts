import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CategoryEntity } from '../../category/entities/category.entity';
import { BaseEntity } from '../../../common';
import { ApiProperty } from '@nestjs/swagger';

@Entity('subcategory')
export class SubcategoryEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  description: string;
  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  isActive: boolean;
  @ApiProperty({ type: CategoryEntity })
  @ManyToOne(() => CategoryEntity, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
