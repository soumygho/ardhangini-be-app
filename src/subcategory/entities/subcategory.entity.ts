import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Subcategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'boolean' })
  isActive: boolean;
  @ManyToOne(() => Category, (Category) => Category.subcategories)
  category: Category;
}
