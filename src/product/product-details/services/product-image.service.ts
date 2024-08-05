import { SareeImageEntity } from './../entities/saree/saree-images.entity';
import { DataSource, Repository } from 'typeorm';
import { FileUploadService } from '../../../common/services/file-upload.service';
import { ImageType } from '../../../common/enum/image-type.enum';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { ProductImageUploadDto } from '../dto/product-image-upload.dto';
import { ProductTypeEntity } from 'src/product/product-type/entities/product-type.entity';
import { ProductTypes } from 'src/product/product-type/enum/product-type.enum';
import { SareeEntity } from '../entities';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductImageUploadService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async uploadProductImage(
    file: Express.Multer.File,
    uploadDto: ProductImageUploadDto,
  ) {
    this.fileUploadService.validateFile(file);
    const uploadResults: ManagedUpload.SendData[] =
      await this.fileUploadService.saveImageFile(file, ImageType.PRODUCT);
    if (
      uploadResults &&
      uploadResults.length === 2 &&
      uploadResults[0]?.Key &&
      uploadResults[1]?.Key
    ) {
      console.trace(JSON.stringify(uploadResults));
      const productAndImageRepository = await this.getRepository(uploadDto);
      const productType: ProductTypeEntity = await this.dataSource
        .getRepository(ProductTypeEntity)
        .findOneByOrFail({ id: uploadDto.productTypeId });
      if (productType.name.toLowerCase() === ProductTypes.SAREE) {
        const sareeImageEntity: SareeImageEntity =
          productAndImageRepository.imageRepository.create();
        if (
          !(await productAndImageRepository.productRepository.existsBy({
            id: uploadDto.productId,
          }))
        ) {
          throw new NotFoundException('Product not Found.');
        }
        const sareeEntity: SareeEntity =
          await productAndImageRepository.productRepository.findOneByOrFail({
            id: uploadDto.productId,
          });
        sareeImageEntity.description = uploadDto.imageDescription;
        sareeImageEntity.imageKey = uploadResults[0].Key;
        sareeImageEntity.imageSource = uploadResults[0].Location;
        sareeImageEntity.product = sareeEntity;
        sareeImageEntity.thumbnailKey = uploadResults[1].Key;
        sareeImageEntity.thumbnailSource = uploadResults[1].Location;
        return productAndImageRepository.imageRepository.save(sareeImageEntity);
      }
    } else {
      console.error('Image upload failed.');
    }
  }

  private async getRepository(uploadDto: ProductImageUploadDto) {
    if (
      !(await this.dataSource.getRepository(ProductTypeEntity).existsBy({
        id: uploadDto.productTypeId,
      }))
    ) {
      throw new NotFoundException('Product Type not Found.');
    }
    const productType: ProductTypeEntity = await this.dataSource
      .getRepository(ProductTypeEntity)
      .findOneByOrFail({ id: uploadDto.productTypeId });

    if (productType.name.toLowerCase() === ProductTypes.SAREE) {
      const productRepository: Repository<SareeEntity> =
        this.dataSource.getRepository(SareeEntity);
      const imageRepository: Repository<SareeImageEntity> =
        this.dataSource.getRepository(SareeImageEntity);
      return {
        productRepository: productRepository,
        imageRepository: imageRepository,
      };
    }
  }
}
