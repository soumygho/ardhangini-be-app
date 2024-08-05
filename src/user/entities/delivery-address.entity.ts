import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('delivery_address')
export class DeliveryAddressEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' })
  firstName: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  lastName: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  addressLine1: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  addressLine2: string;
  @ApiProperty()
  @Column({ type: 'numeric' })
  pin: number;
  @ApiProperty()
  @Column({ type: 'varchar' })
  state: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  town: string;
  @ApiProperty()
  @Column({ type: 'varchar' })
  mobileNumber: string;
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userDetails: UserEntity;

  public convertToString() {
    return `${this.addressLine1},${this.addressLine2},${this.pin},${this.state}, India`;
  }
}
