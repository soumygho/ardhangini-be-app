import { ApiProperty } from '@nestjs/swagger';
import { ProductSnapshotDto } from './product-snapshot.dto';

export class ProductSnapshotWithUserDto extends ProductSnapshotDto {
  @ApiProperty()
  isCarted: boolean;
  @ApiProperty()
  isWishListed: boolean;
}
