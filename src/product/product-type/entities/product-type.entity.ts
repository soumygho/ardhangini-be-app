import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'boolean' })
  isActive: boolean;
  @Column({ type: 'varchar' })
  description: string;
}
