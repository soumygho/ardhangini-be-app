import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { FabricDetailsEntity } from '../../../fabric/entity/fabric-details.entity';
import { ProductDetailsEntity } from '../common/product-details.entity';
import { SareeEntity } from './saree.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('saree_details')
export class SareeDetailsEntity extends ProductDetailsEntity {
  @Exclude({ toPlainOnly: true })
  @OneToOne(() => SareeEntity, { onDelete: 'CASCADE' })
  product: SareeEntity;
  /*@Column({ name: 'saree_id', nullable: true })
  sareeId: string;*/

  @ApiProperty()
  @ManyToOne(() => FabricDetailsEntity, { eager: true })
  @JoinColumn({ name: 'fabricdetails_id' })
  @ApiProperty()
  fabricDetails: FabricDetailsEntity;
  @Column({ name: 'length', type: 'numeric' })
  @ApiProperty()
  length: number;
  @Column({ name: 'width', type: 'numeric' })
  @ApiProperty()
  width: number;
  @Column({ name: 'blouse_included', type: 'boolean', default: false })
  @ApiProperty()
  blousePieceIncluded: boolean;
  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  blouse_desc: string;
}
