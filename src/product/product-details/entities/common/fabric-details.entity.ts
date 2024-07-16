import { BaseEntity } from 'src/common';
import { Entity } from 'typeorm';

@Entity('fabric_details')
export class FabricDetailsEntity extends BaseEntity {
  fabricname: string;
  fabricdescription: string;
  washcare: string;
}
