import { Injectable } from '@nestjs/common';
import { CreateSiteImageDto } from './dto/create-site-image.dto';
import { UpdateSiteImageDto } from './dto/update-site-image.dto';

@Injectable()
export class SiteImageService {
  create(createSiteImageDto: CreateSiteImageDto) {
    return 'This action adds a new siteImage';
  }

  findAll() {
    return `This action returns all siteImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} siteImage`;
  }

  update(id: number, updateSiteImageDto: UpdateSiteImageDto) {
    return `This action updates a #${id} siteImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} siteImage`;
  }
}
