import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common';
import { Column, Entity } from 'typeorm';

@Entity()
export class ManufacturerEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' })
  origin: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  address: string;
}
