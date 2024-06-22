import { Module } from '@nestjs/common';
import { ProductpriceService } from './productprice.service';
import { ProductpriceController } from './productprice.controller';

@Module({
  controllers: [ProductpriceController],
  providers: [ProductpriceService],
})
export class ProductpriceModule {}
