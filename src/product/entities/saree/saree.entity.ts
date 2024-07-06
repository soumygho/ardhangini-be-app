import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Product } from '../product.entity';
import { SareeDetails } from './saree-details.entity';

@Entity('saree')
export class Saree extends Product {
  @OneToOne(() => SareeDetails)
  @JoinColumn({ name: 'sareedetails_id' })
  sareeDetails: SareeDetails;
}
