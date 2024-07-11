import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @Column({ name: 'created_by', nullable: true })
  createdBy: string;
  @Column({ name: 'modified_by', nullable: true })
  modifiedBy: string;
}
