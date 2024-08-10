import { Module } from '@nestjs/common';
import {
  FabricDetailsEntity,
  ProductImageUploadService,
  ProductService,
  SareeDetailsEntity,
  SareeEntity,
} from './product-details';
import { ProductController } from './product-details';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category/entities/category.entity';
import { SubcategoryEntity } from './subcategory/entities/subcategory.entity';
import { ManufacturerEntity } from './manufacturer/entities/manufacturer.entity';
import { CategoryController } from './category/category.controller';
import { SubcategoryController } from './subcategory/subcategory.controller';
import { ManufacturerController } from './manufacturer/manufacturer.controller';
import { OrderController } from './order/controller/order.controller';
import { PaymentController } from './payment/controller/payment.controller';
import { CategoryService } from './category/category.service';
import { SubcategoryService } from './subcategory/subcategory.service';
import { ManufacturerService } from './manufacturer/manufacturer.service';
import { ProductTypeEntity } from './product-type/entities/product-type.entity';
import { ProductTypeController } from './product-type/product-type.controller';
import { ProductTypeService } from './product-type/product-type.service';
import { PaymentService } from './payment/services/payment.service';
import { OrderService } from './order/services/order.service';
import { ProductImageController } from './product-details/controller/product-image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { RegisterOrUpdateProductTransaction } from './product-details/transactions/register-product.transaction';
import { FabricService } from './fabric/service/fabric.service';
import { FabricController } from './fabric/controller/fabric.controller';
import { SareeDetailsMapper } from './product-details/mapper/saree-details.mapper';
import { SareeImageEntity } from './product-details/entities/saree/saree-images.entity';
import { CartResponseMapper } from './cart/util/cart-response.mapper';
import { AddOrUpdateCartTransaction } from './cart/transaction/add-update-cart.transaction';
import { PromoDetailsEntity } from './promo/entity/promo-details.entity';
import { ProductCollectionEntity } from './collections/entity/product-collection.entity';
import { ProductColelctionController } from './collections/controller/product-collection.controller';
import { ProductCollectionService } from './collections/service/collection.service';
import { ProductStyleController } from './product-style/controller/product-style.controller';
import { ProductStyleService } from './product-style/service/product-style.service';
import { ProductStyleEntity } from './product-style/entity/product-style.entity';
import { ProductOccassionEntity } from './product-occasion/entity/product-occassion.entity';
import { ProductOccassionController } from './product-occasion/controller/product-collection.controller';
import { ProductColorEntity } from './colours/entity/product-colour.entity';
import { ProductColorController } from './colours/controller/product-color.controller';
import { ProductOccassionsService } from './product-occasion/service/product-occassions.service';
import { ProductColorService } from './colours/service/collection.service';
import { ProductPrintsEntity } from './prints/entity/product-prints.entity';
import { ProductPrintsController } from './prints/controller/product-collection.controller';
import { ProductPrintsService } from './prints/service/product-prints.service';
import { PromoDetailsController } from './promo/controller/promo-details.controller';
import { PromoDetailsService } from './promo/service/promo-details.service';
import { OrderDetailsMapper } from './order/mapper/order-details.mapper';
import { OrderDetailsEntity } from './order/entities/order.entity';
import { CartDetailsEntity } from './cart/entity/cart-details.entity';
import { OrderLineItemEntity } from './order/entities/order-line-item.entity';
import { CartLineItemEntity } from './cart/entity/cart-line-item.entity';
import { OrderTimeLineEntity } from './order/entities/order-timeline.entity';
import { PaymentEntity } from './payment/entity/payment.entity';
import { CreateOrderTransaction } from './order/transactions/create-order.transaction';
import { WishListEntity } from './wishlist/entity/wishlist.entity';
import { WishListLineItemEntity } from './wishlist/entity/wishlist-item.entity';
import { AddOrUpdateWishListTransaction } from './wishlist/transaction/add-update-wishlist.transaction';
import { WishListResponseMapper } from './wishlist/util/wishlist-response.mapper';
import { SareeService } from './product-details/services/saree.service';
import { SareeController } from './product-details/controller/saree-product.controller';
import { CartController } from './cart/controller/cart.controller';
import { WishListController } from './wishlist/controller/wish-list.controller';
import { CartService } from './cart/service/cart.service';
import { WishListService } from './wishlist/service/wish-list.service';

@Module({
  imports: [
    MulterModule.register(),
    TypeOrmModule.forFeature([
      CategoryEntity,
      SubcategoryEntity,
      ManufacturerEntity,
      ProductTypeEntity,
      FabricDetailsEntity,
      SareeDetailsEntity,
      SareeEntity,
      SareeImageEntity,
      PromoDetailsEntity,
      ProductCollectionEntity,
      ProductStyleEntity,
      ProductOccassionEntity,
      ProductColorEntity,
      ProductPrintsEntity,
      PromoDetailsEntity,
      OrderDetailsEntity,
      CartDetailsEntity,
      OrderLineItemEntity,
      CartLineItemEntity,
      OrderTimeLineEntity,
      PaymentEntity,
      WishListEntity,
      WishListLineItemEntity,
    ]),
    CommonModule,
  ],
  controllers: [
    CategoryController,
    SubcategoryController,
    ManufacturerController,
    ProductTypeController,
    ProductController,
    OrderController,
    PaymentController,
    ProductImageController,
    FabricController,
    ProductColelctionController,
    ProductStyleController,
    ProductOccassionController,
    ProductColorController,
    ProductPrintsController,
    PromoDetailsController,
    CartController,
    WishListController,
    PromoDetailsController,
    SareeController,
  ],
  providers: [
    CategoryService,
    SubcategoryService,
    ManufacturerService,
    ProductTypeService,
    ProductService,
    OrderService,
    PaymentService,
    FabricService,
    ProductImageUploadService,
    RegisterOrUpdateProductTransaction,
    SareeDetailsMapper,
    CartResponseMapper,
    AddOrUpdateCartTransaction,
    ProductCollectionService,
    ProductStyleService,
    ProductOccassionsService,
    ProductColorService,
    ProductPrintsService,
    PromoDetailsService,
    OrderDetailsMapper,
    OrderService,
    CreateOrderTransaction,
    AddOrUpdateWishListTransaction,
    PromoDetailsService,
    WishListResponseMapper,
    SareeService,
    CartService,
    WishListService,
  ],
  exports: [],
})
export class ProductModule {}
