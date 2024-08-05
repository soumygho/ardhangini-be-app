import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3FileUploadService } from './s3-upload.service';
import { v4 as uuidv4 } from 'uuid';
import { ImageType } from '../../product/product-details';
import * as sharp from 'sharp';

@Injectable()
export class FileUploadService {
  constructor(private readonly s3FileUploadService: S3FileUploadService) {}

  async saveImageFile(file: Express.Multer.File, fileType: ImageType) {
    console.log(file);
    const uniqueId = uuidv4();
    const fileName =
      fileType.valueOf() + '-' + uniqueId + '.' + file.mimetype.split('/')[1];
    console.log('File Name : ' + fileName);
    const s3Response = await this.s3FileUploadService.uploadFile(
      file.buffer,
      fileName,
      file.mimetype,
    );
    const resizedImage = await sharp(file.buffer)
      .resize(200, 200)
      .jpeg()
      .toBuffer();
    const tumbNailfileName =
      fileType.valueOf() + '-' + 'thumbnail-' + uniqueId + '.' + 'jpeg';
    const s3ResponseForTumbNail = await this.s3FileUploadService.uploadFile(
      resizedImage,
      tumbNailfileName,
      'jpeg',
    );
    return [s3Response, s3ResponseForTumbNail];
  }

  async validateFile(file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File is empty', HttpStatus.BAD_REQUEST);
    }
    const allowedFileextensions: string[] = [
      'image/png',
      'image/jpg',
      'image/jpeg',
    ];
    if (file && file?.buffer && file?.originalname && file?.mimetype)
      throw new HttpException('File corrupted', HttpStatus.BAD_REQUEST);
    if (!allowedFileextensions.includes(file.mimetype))
      throw new HttpException('File type not allowed.', HttpStatus.BAD_REQUEST);
  }
}
