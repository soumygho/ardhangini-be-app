import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CategoryEntity } from '../../category/entities/category.entity';
import { BaseEntity } from '../../../common';

@Entity('subcategory')
export class SubcategoryEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar', nullable: true })
  description: string;
  @Column({ type: 'boolean', default: false })
  isActive: boolean;
  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
