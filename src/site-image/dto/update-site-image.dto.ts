import { PartialType } from '@nestjs/swagger';
import { CreateSiteImageDto } from './create-site-image.dto';

export class UpdateSiteImageDto extends PartialType(CreateSiteImageDto) {}
