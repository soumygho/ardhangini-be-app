import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { ProductPrintsService } from '../service/product-prints.service';
import { CreateProductPrintDto } from '../dto/create-prints.dto';
import { ProductPrintsEntity } from '../entity/product-prints.entity';

@Controller('product-prints')
@ApiTags('product-prints')
export class ProductPrintsController extends BaseController {
  constructor(private readonly service: ProductPrintsService) {
    super();
  }

  @Post()
  @ApiOperation({
    description: 'Create product Print',
  })
  async create(@Body() dto: CreateProductPrintDto) {
    return await this.service.create(dto);
  }

  @Patch()
  @ApiOperation({
    description: 'Update product print',
  })
  async update(@Body() dto: CreateProductPrintDto) {
    return await this.service.update(dto);
  }

  @Get()
  @ApiOperation({
    description: 'Get All product prints',
  })
  @ApiOkResponse({
    description: 'Get All product prints',
    type: ProductPrintsEntity,
    isArray: true,
  })
  async getAll() {
    return await this.service.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
