import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('fabric_details')
export class FabricDetailsEntity extends BaseEntity {
  @Column({ name: 'fabric_name', type: 'varchar' })
  @ApiProperty()
  fabricName: string;
  @Column({ name: 'fabric_desc', type: 'varchar', nullable: true })
  @ApiProperty()
  fabricDescription: string;
  @Column({ name: 'washcare_desc', type: 'varchar', nullable: true })
  @ApiProperty()
  washCare: string;
}
