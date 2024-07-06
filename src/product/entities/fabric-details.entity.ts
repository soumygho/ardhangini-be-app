import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fabric_details')
export class FabricDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  fabricname: string;
  fabricdescription: string;
  washcare: string;
}
