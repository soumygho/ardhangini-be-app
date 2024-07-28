import { Column, Entity } from 'typeorm';
import { ProductTypes } from '../enum/product-type.enum';
import { BaseEntity } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProductTypeEntity extends BaseEntity {
  @ApiProperty({
    enum: ProductTypes,
    default: ProductTypes.SAREE,
  })
  @Column({
    type: 'enum',
    enum: ProductTypes,
    default: ProductTypes.SAREE,
  })
  name: ProductTypes;
  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  isActive: boolean;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  description: string;
}
