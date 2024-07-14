import { ProductSnapshotDto } from './product-snapshot.dto';

export class SareeDetailsDto extends ProductSnapshotDto {
  fabricname: string;
  fabricDescription: string;
  washcare: string;
  length: number;
  width: number;
  blouse_piece: boolean;
  blouse_desc: string;
  return_exchange_policy: string;
}
