import { Base } from '../../../common';
import { Entity } from 'typeorm';

@Entity()
export class Manufacturer extends Base {
  origin: string;
  name: string;
  address: string;
}
