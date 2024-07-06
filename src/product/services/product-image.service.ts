import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from '../entities/product-images.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from './file-upload.service';

@Injectable()
export class ProductImageUploadService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    private readonly fileUploadService: FileUploadService,
  ) {}
}
