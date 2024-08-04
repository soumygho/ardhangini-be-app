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
import { ProductStyleService } from '../service/product-style.service';
import { CreateProductStyleDto } from '../dto/create-product-style.dto';
import { ProductStyleEntity } from '../entity/product-style.entity';

@Controller('product-style')
@ApiTags('product-style')
export class ProductStyleController extends BaseController {
  constructor(private readonly service: ProductStyleService) {
    super();
  }

  @Post()
  @ApiOperation({
    description: 'Create product Style',
  })
  async create(@Body() dto: CreateProductStyleDto) {
    return await this.service.create(dto);
  }

  @Patch()
  @ApiOperation({
    description: 'Update product Style',
  })
  async update(@Body() dto: CreateProductStyleDto) {
    return await this.service.update(dto);
  }

  @Get()
  @ApiOperation({
    description: 'Get All product styles',
  })
  @ApiOkResponse({
    description: 'Get All product styles',
    type: ProductStyleEntity,
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
