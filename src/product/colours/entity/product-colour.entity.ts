import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';
@Entity('product_color')
export class ProductColorEntity extends BaseEntity {
  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  name: string;
}
