import { Injectable } from '@nestjs/common';
import { S3FileUploadService } from './s3-upload.service';
import { v4 as uuidv4 } from 'uuid';
import { ImageType } from '../enums/product.enum';
import sharp from 'sharp';

@Injectable()
export class FileUploadService {
  constructor(private readonly s3FileUploadService: S3FileUploadService) {}

  async saveImageFile(file: Express.Multer.File, fileType: ImageType) {
    await this.validateFile(file);
    const uniqueId = uuidv4();
    const fileName =
      fileType.valueOf() + '-' + uniqueId + '.' + file.mimetype.split('/')[1];
    console.log('File Name : ' + fileName);
    const s3Response = await this.s3FileUploadService.uploadFile(
      file.buffer,
      fileName,
      file.mimetype,
    );
    const resizedImage = sharp(file.buffer).resize(200, 200).jpeg().toBuffer();
    const tumbNailfileName =
      fileType.valueOf() + '-' + 'thumbnail-' + uniqueId + '.' + 'jpeg';
    const s3ResponseForTumbNail = await this.s3FileUploadService.uploadFile(
      resizedImage,
      tumbNailfileName,
      'jpeg',
    );
    return [s3Response, s3ResponseForTumbNail];
  }

  private async validateFile(file: Express.Multer.File) {
    const allowedFileextensions: string[] = [
      'image/png',
      'image/jpg',
      'image/jpeg',
    ];
    if (!file && !file.buffer && !file.originalname && !file.mimetype)
      throw new Error('file corrupted');
    if (!allowedFileextensions.includes(file.mimetype))
      throw new Error('file type mismatch');
  }
}
