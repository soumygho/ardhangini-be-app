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
  ],
  exports: [],
})
export class ProductModule {}
