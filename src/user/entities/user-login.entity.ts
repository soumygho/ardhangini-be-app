import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common';
import { LoginType } from '../enum/user.enum';
import { UserEntity } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserLoginDetailsEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: LoginType,
    default: LoginType.EMAIL,
  })
  @Exclude({ toPlainOnly: true })
  logintype: LoginType;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  @Column({ type: 'varchar' })
  @Exclude({ toPlainOnly: true })
  accessToken: string;
  @Column({ type: 'varchar', nullable: true })
  @Exclude({ toPlainOnly: true })
  refreshToken: string;
}
