import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ required: false })
  id: string;

  @Exclude({ toPlainOnly: true })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @Exclude({ toPlainOnly: true })
  @Column({ name: 'created_by', nullable: true })
  createdBy: string;
  @Exclude({ toPlainOnly: true })
  @Column({ name: 'modified_by', nullable: true })
  modifiedBy: string;
}
