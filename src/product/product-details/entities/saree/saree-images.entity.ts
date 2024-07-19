import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ImageEntity } from 'src/common/entity/image.entity';
import { SareeEntity } from '.';

@Entity('saree-image')
export class SareeImageEntity extends ImageEntity {
  @ManyToOne(() => SareeEntity)
  @JoinColumn({ name: 'product_id' })
  product: SareeEntity;
}
