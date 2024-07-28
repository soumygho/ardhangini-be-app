import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('offer_details')
export class PromoDetailsEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' })
  startDate: Date;
  @ApiProperty()
  @Column({ type: 'varchar' })
  endDate: Date;
  @ApiProperty()
  @Column({ type: 'varchar' })
  description: string;
  @ApiProperty({ required: false })
  @Column({ type: 'numeric', nullable: true })
  minimumOrderValue: number;
  @ApiProperty({
    required: false,
  })
  @Column({ type: 'numeric', nullable: true })
  discountPercentage: number;
  @ApiProperty({
    required: false,
  })
  @Column({ type: 'numeric', nullable: true })
  flatDiscount: number;
}
