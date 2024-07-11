import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from '../entities/common/product-images.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from '../../../common/services/file-upload.service';
import { ImageType } from '../enums/product.enum';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ManagedUpload } from 'aws-sdk/clients/s3';

@Injectable()
export class ProductImageUploadService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    private readonly fileUploadService: FileUploadService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async uploadProductImage(file: Express.Multer.File, productId: string) {
    this.fileUploadService.validateFile(file);
    const uploadCallback = async (file) => {
      const uploadResults: ManagedUpload.SendData[] =
        await this.fileUploadService.saveImageFile(file, ImageType.PRODUCT);
    };
  }
}
