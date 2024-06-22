import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SiteImageService } from './site-image.service';
import { CreateSiteImageDto } from './dto/create-site-image.dto';
import { UpdateSiteImageDto } from './dto/update-site-image.dto';

@Controller('site-image')
export class SiteImageController {
  constructor(private readonly siteImageService: SiteImageService) {}

  @Post()
  create(@Body() createSiteImageDto: CreateSiteImageDto) {
    return this.siteImageService.create(createSiteImageDto);
  }

  @Get()
  findAll() {
    return this.siteImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiteImageDto: UpdateSiteImageDto) {
    return this.siteImageService.update(+id, updateSiteImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteImageService.remove(+id);
  }
}
