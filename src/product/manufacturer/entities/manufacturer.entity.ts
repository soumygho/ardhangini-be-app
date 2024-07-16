import { BaseEntity } from '../../../common';
import { Column, Entity } from 'typeorm';

@Entity()
export class ManufacturerEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  origin: string;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  address: string;
}
