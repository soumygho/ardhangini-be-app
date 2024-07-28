import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('delivery_address')
export class DeliveryAddressEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' })
  addressLine1: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  addressLine2: string;
  @ApiProperty()
  @Column({ type: 'number' })
  pin: number;
  @ApiProperty()
  @Column({ type: 'varchar' })
  state: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  nickname: string;

  public convertToString() {
    return `${this.addressLine1},${this.addressLine2},${this.pin},${this.state}, India`;
  }
}
