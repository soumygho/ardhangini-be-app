import { Base } from '../../../common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Manufacturer extends Base {
  @Column({ type: 'varchar' })
  origin: string;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  address: string;
}
