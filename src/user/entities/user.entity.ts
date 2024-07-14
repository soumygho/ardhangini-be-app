import { Column, Entity } from 'typeorm';
import { Base } from '../../common';
import { AccountStatus } from '../enum/user.enum';
import { Gender } from '../enum/gender.enum';

@Entity()
export class User extends Base {
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'date' })
  dob: string;
  @Column({ type: 'varchar', nullable: true })
  email: string;
  @Column({ type: 'varchar', nullable: true })
  mobile: string;
  @Column({ type: 'varchar', nullable: true })
  bio: string;
  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.ACTIVE,
  })
  accountStatus: AccountStatus;
  @Column({ type: 'varchar', nullable: true })
  blackListReason: string;
  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  sex: Gender;
}
