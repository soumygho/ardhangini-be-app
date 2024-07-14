import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Base } from '../../../common';

@Entity('subcategory')
export class Subcategory extends Base {
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar', nullable: true })
  description: string;
  @Column({ type: 'boolean', default: false })
  isActive: boolean;
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
