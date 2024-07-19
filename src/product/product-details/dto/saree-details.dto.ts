import { ApiProperty } from '@nestjs/swagger';
import { SareeImageEntity } from '../entities/saree/saree-images.entity';

export class SareeDetailsDto {
  @ApiProperty()
  fabricname: string;
  @ApiProperty()
  fabricDescription: string;
  @ApiProperty()
  washcare: string;
  @ApiProperty()
  length: number;
  @ApiProperty()
  width: number;
  @ApiProperty()
  blouse_piece: boolean;
  @ApiProperty()
  blouse_desc: string;
  @ApiProperty()
  sareeImages: SareeImageEntity[];
}
