import { Module } from '@nestjs/common';
import { ProductService } from './product-details';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryEntity,
      SubcategoryEntity,
      ManufacturerEntity,
      ProductTypeEntity,
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
