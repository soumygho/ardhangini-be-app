import { Base } from 'src/category/entities/base.entity';
import { Entity } from 'typeorm';

@Entity()
export class Manufacturer extends Base {
  origin: string;
  name: string;
  address: string;
}
