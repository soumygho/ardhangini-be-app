import { Module } from '@nestjs/common';
import { SiteImageService } from './site-image.service';
import { SiteImageController } from './site-image.controller';

@Module({
  controllers: [SiteImageController],
  providers: [SiteImageService],
})
export class SiteImageModule {}
