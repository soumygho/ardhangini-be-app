import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common';
import { ApiProperty } from '@nestjs/swagger';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  description: string;
  @ApiProperty()
  @Column({ type: 'boolean' })
  isActive: boolean;
}
