import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'boolean' })
  isActive: boolean;
}
