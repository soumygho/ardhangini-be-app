import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity('category')
export class Category extends Base {
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'boolean' })
  isActive: boolean;
}
