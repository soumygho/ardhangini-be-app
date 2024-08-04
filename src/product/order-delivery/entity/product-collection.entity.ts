import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';
@Entity('product_collection')
export class ProductCollectionEntity extends BaseEntity {
  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  description: string;
}
