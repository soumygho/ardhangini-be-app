export class ProductSnapshotDto {
  productid: string;
  producttype: string;
  category: string;
  subcategory: string;
  skuid: string;
  productname: string;
  productdescription: string;
  offerprice: number;
  actualprice: number;
  isTrending: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  availableQuantity: number;
  averageReview: number;
  productImages: string[];
  thumbNailImages: string[];
}
