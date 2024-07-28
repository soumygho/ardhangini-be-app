import { BaseController } from 'src/common';
import { PromoDetailsService } from '../service/promo-details.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePromoDto } from '../dto/create-promo.dto';
import { PromoDetailsEntity } from '../entity/promo-details.entity';

@ApiTags('promo-details')
@Controller('promo-details')
export class PromoDetailsController extends BaseController {
  constructor(private readonly promoDetailsService: PromoDetailsService) {
    super();
  }

  @Post()
  @ApiOperation({
    description: 'Create Promo details',
  })
  async createOrupdate(@Body() payLoad: CreatePromoDto) {
    return await this.promoDetailsService.create(payLoad);
  }

  @Get()
  @ApiOperation({
    description: 'Get all Promo details',
  })
  @ApiOkResponse({
    description: 'Get all Promo details',
    type: PromoDetailsEntity,
    isArray: true,
  })
  async getAll() {
    return await this.promoDetailsService.getAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promoDetailsService.delete(id);
  }
}
