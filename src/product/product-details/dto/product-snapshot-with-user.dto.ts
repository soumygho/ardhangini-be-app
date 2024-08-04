import { ProductSnapshotDto } from './product-snapshot.dto';

export class ProductSnapshotWithUserDto extends ProductSnapshotDto {
  isCarted: boolean;
  isWishListed: boolean;
}
