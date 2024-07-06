import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { S3FileUploadService } from './services/s3-upload.service';
import { FileUploadService } from './services/file-upload.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, S3FileUploadService, FileUploadService],
  exports: [],
})
export class ProductModule {}
