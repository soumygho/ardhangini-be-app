import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'boolean' })
  isActive: boolean;
  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];
}
