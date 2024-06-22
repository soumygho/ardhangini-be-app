import { Module } from '@nestjs/common';
import { ProductofferService } from './productoffer.service';
import { ProductofferController } from './productoffer.controller';

@Module({
  controllers: [ProductofferController],
  providers: [ProductofferService],
})
export class ProductofferModule {}
