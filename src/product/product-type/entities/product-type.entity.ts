import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductTypes } from '../enum/product-type.enum';

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'enum',
    enum: ProductTypes,
    default: ProductTypes.SAREE,
  })
  name: ProductTypes;
  @Column({ type: 'boolean', default: false })
  isActive: boolean;
  @Column({ type: 'varchar', nullable: true })
  description: string;
}
