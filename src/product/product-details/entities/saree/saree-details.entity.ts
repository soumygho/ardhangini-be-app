import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FabricDetailsEntity } from '../common/fabric-details.entity';
import { ProductDetailsEntity } from '../common/product-details.entity';

@Entity('saree_details')
export class SareeDetailsEntity extends ProductDetailsEntity {
  @ManyToOne(() => FabricDetailsEntity)
  @JoinColumn({ name: 'fabricdetails_id' })
  fabricDetails: FabricDetailsEntity;
  @Column({ type: 'numeric' })
  length: number;
  @Column({ type: 'numeric' })
  width: number;
  @Column({ type: 'boolean' })
  blouse_piece: boolean;
  @Column({ type: 'varchar' })
  blouse_desc: string;
  @Column({ type: 'varchar' })
  return_exchange_policy: string;
}
