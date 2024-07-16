import { Column, Entity } from 'typeorm';
import { ProductTypes } from '../enum/product-type.enum';
import { BaseEntity } from 'src/common';

@Entity()
export class ProductTypeEntity extends BaseEntity {
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
