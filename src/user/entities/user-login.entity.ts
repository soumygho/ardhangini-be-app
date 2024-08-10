import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common';
import { LoginType } from '../enum/user.enum';
import { UserEntity } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity('user_login_details')
export class UserLoginDetailsEntity extends BaseEntity {
  @Column({
    name: 'login_type',
    type: 'enum',
    enum: LoginType,
    default: LoginType.EMAIL,
  })
  @Exclude({ toPlainOnly: true })
  logintype: LoginType;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'varchar', nullable: true })
  @Exclude({ toPlainOnly: true })
  providerAccessToken: string;

  @Column({ type: 'varchar', nullable: true })
  @Exclude({ toPlainOnly: true })
  providerRefreshToken: string;

  //it is used to store ardhangini portal password
  @Column({ type: 'varchar', nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;
}
