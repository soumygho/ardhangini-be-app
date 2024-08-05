import { Body, Controller, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { SareeService } from '../services/saree.service';
import { SareeFilterDto } from '../dto/saree-filter';
import { ProductSnapshotWithUserDto } from '../dto/product-snapshot-with-user.dto';

@ApiTags('customer/saree-details')
@Controller('customer/saree-details')
export class SareeController extends BaseController {
  constructor(private readonly sareeService: SareeService) {
    super();
  }
  @ApiOperation({
    description: 'List sarees with the filters',
  })
  @ApiOkResponse({
    description: 'All Sarees Filter Response',
    type: ProductSnapshotWithUserDto,
    isArray: true,
  })
  async getAll(@Req() request, @Body() dto: SareeFilterDto) {
    return await this.sareeService.getAll(request, dto);
  }
}
