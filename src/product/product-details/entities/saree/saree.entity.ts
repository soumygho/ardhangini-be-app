import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { ProductEntity } from '../common/product.entity';
import { SareeDetailsEntity } from './saree-details.entity';

@Entity('saree')
export class SareeEntity extends ProductEntity {
  @OneToOne(() => SareeDetailsEntity)
  @JoinColumn({ name: 'sareedetails_id' })
  sareeDetails: SareeDetailsEntity;
}
