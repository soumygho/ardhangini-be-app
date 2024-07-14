import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '../../common';
import { LoginType } from '../enum/user.enum';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserLoginDetails extends Base {
  @Column({
    type: 'enum',
    enum: LoginType,
    default: LoginType.EMAIL,
  })
  @Exclude({ toPlainOnly: true })
  logintype: LoginType;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @Column({ type: 'varchar' })
  @Exclude({ toPlainOnly: true })
  accessToken: string;
  @Column({ type: 'varchar', nullable: true })
  @Exclude({ toPlainOnly: true })
  refreshToken: string;
}
