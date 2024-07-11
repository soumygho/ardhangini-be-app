import { Module } from '@nestjs/common';
import { ProductService } from './product-details';
import { ProductController } from './product-details';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { Subcategory } from './subcategory/entities/subcategory.entity';
import { Manufacturer } from './manufacturer/entities/manufacturer.entity';
import { CategoryController } from './category/category.controller';
import { SubcategoryController } from './subcategory/subcategory.controller';
import { ManufacturerController } from './manufacturer/manufacturer.controller';
import { OrderController } from './order/controller/order.controller';
import { PaymentController } from './payment/controller/payment.controller';
import { CategoryService } from './category/category.service';
import { SubcategoryService } from './subcategory/subcategory.service';
import { ManufacturerService } from './manufacturer/manufacturer.service';
import { ProductType } from './product-type/entities/product-type.entity';
import { ProductTypeController } from './product-type/product-type.controller';
import { ProductTypeService } from './product-type/product-type.service';
import { PaymentService } from './payment/services/payment.service';
import { OrderService } from './order/services/order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Subcategory,
      Manufacturer,
      ProductType,
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
  ],
  providers: [
    CategoryService,
    SubcategoryService,
    ManufacturerService,
    ProductTypeService,
    ProductService,
    OrderService,
    PaymentService,
  ],
  exports: [],
})
export class ProductModule {}
