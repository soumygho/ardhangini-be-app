import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ImageEntity } from 'src/common/entity/image.entity';

@Entity('profile-image')
export class UserProfileImageEntity extends ImageEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  userDetails: UserEntity;
}
