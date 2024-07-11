import { Module } from '@nestjs/common';
import { FileUploadService } from './services/file-upload.service';
import { S3FileUploadService } from './services/s3-upload.service';

@Module({
  imports: [],
  controllers: [],
  providers: [S3FileUploadService, FileUploadService],
  exports: [S3FileUploadService, FileUploadService],
})
export class CommonModule {}
