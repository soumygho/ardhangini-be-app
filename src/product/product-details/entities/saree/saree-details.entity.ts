import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FabricDetails } from '../common/fabric-details.entity';
import { ProductDetails } from '../common/product-details.entity';

@Entity('saree_details')
export class SareeDetails extends ProductDetails {
  @ManyToOne(() => FabricDetails)
  @JoinColumn({ name: 'fabricdetails_id' })
  fabricDetails: FabricDetails;
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
