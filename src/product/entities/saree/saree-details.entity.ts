import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FabricDetails } from '../fabric-details.entity';
import { ProductDetails } from '../product-details.entity';

@Entity('saree_details')
export class SareeDetails extends ProductDetails {
  @ManyToOne(() => FabricDetails)
  @JoinColumn({ name: 'fabricdetails_id' })
  fabricDetails: FabricDetails;
  length: number;
  width: number;
  blouse_piece: boolean;
  blouse_desc: string;
  return_exchange_policy: string;
}
