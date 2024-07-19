import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { ProductImageUploadService } from '../services';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductImageUploadDto } from '../dto/product-image-upload.dto';
import { SareeImageEntity } from '../entities/saree/saree-images.entity';

@Controller('product-image')
@ApiTags('Product image api')
export class ProductImageController extends BaseController {
  constructor(private readonly imageService: ProductImageUploadService) {
    super();
  }
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    description: 'Image entities',
    type: SareeImageEntity,
    isArray: false,
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadProductImage(
    @UploadedFile('file') file: Express.Multer.File,
    @Body() imageUploadDto: ProductImageUploadDto,
  ) {
    return this.imageService.uploadProductImage(file, imageUploadDto);
  }
}
