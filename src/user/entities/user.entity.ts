import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common';
import { AccountStatus } from '../enum/user.enum';
import { Gender } from '../enum/gender.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;
  @ApiProperty()
  @Column({ type: 'date' })
  dob: string;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  email: string;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  mobile: string;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  bio: string;
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.ACTIVE,
  })
  accountStatus: AccountStatus;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  blackListReason: string;
  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  sex: Gender;
  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
}
