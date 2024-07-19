import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
@Injectable()
export class S3FileUploadService {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async uploadFile(file, fileName, mimeType) {
    return await this.s3_upload(file, this.AWS_S3_BUCKET, fileName, mimeType);
  }

  private async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      //ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_S3_REGION,
      },
    };

    console.log(params);

    try {
      const s3Response = await this.s3.upload(params).promise();
      console.log(s3Response);
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
