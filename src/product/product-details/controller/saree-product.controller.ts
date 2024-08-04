import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { DataSource } from 'typeorm';

@ApiTags('customer/saree-details')
@Controller('customer/saree-details')
export class SareeController extends BaseController {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  async getAll() {}
}
