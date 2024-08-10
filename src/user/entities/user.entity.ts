import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common';
import { AccountStatus } from '../enum/user.enum';
import { Gender } from '../enum/gender.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  firstName: string;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  lastName: string;
  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  dob: Date;
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

  //it is used to store ardhangini portal refresh token
  @Column({ type: 'varchar', nullable: true })
  @Exclude({ toPlainOnly: true })
  refreshToken: string;
}
