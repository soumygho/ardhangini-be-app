import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { SareeService } from '../services/saree.service';
import { SareeFilterDto } from '../dto/saree-filter';
import { ProductSnapshotWithUserDto } from '../dto/product-snapshot-with-user.dto';

@ApiTags('customer-saree-details')
@Controller('product-details')
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
  @Post('saree')
  async getAll(@Req() request, @Body() dto: SareeFilterDto) {
    return await this.sareeService.getAll(request, dto);
  }

  @ApiOperation({
    description: 'Related Sarees',
  })
  @ApiOkResponse({
    description: 'All Sarees Filter Response',
    type: ProductSnapshotWithUserDto,
    isArray: true,
  })
  @Get('realted-sarees/:sareeId')
  async getRelatedSarees(@Req() request, @Param('sareeId') sareeId: string) {
    return await this.sareeService.getRelatedSarees(request, sareeId);
  }
}
