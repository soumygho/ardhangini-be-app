import { BaseEntity } from './base.entity';
import { Column } from 'typeorm';
import { ImageType } from '../enum/image-type.enum';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export abstract class ImageEntity extends BaseEntity {
  @Column({ name: 'image_desc', type: 'varchar', nullable: true })
  @ApiProperty()
  description: string;
  @Column({ name: 'image_source', type: 'varchar' })
  @ApiProperty()
  imageSource: string;
  @Column({ name: 'image_s3_key', type: 'varchar' })
  @ApiProperty()
  imageKey: string;
  @Column({ name: 'thumbnail_desc', type: 'varchar' })
  @ApiProperty()
  thumbnailSource: string;
  @Column({ name: 'thumbnail_s3_key', type: 'varchar' })
  @ApiProperty()
  thumbnailKey: string;

  @Exclude({ toPlainOnly: true })
  @Column({
    type: 'enum',
    enum: ImageType,
    default: ImageType.PRODUCT,
  })
  imageType: ImageType;
}
