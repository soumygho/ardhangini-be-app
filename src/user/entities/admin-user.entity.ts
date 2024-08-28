import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('admin-user-details')
export class AdminUserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  userName: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'varchar', nullable: true })
  refreshToken: string;
  @Column({ type: 'varchar', array: true, nullable: true })
  role: string[];
}
