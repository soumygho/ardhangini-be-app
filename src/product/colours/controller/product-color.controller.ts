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
import { ProductColorService } from '../service/collection.service';
import { CreateProductColorDto } from '../dto/create-color.dto';
import { ProductColorEntity } from '../entity/product-colour.entity';

@Controller('product-color')
@ApiTags('product-color')
export class ProductColorController extends BaseController {
  constructor(private readonly service: ProductColorService) {
    super();
  }

  @Post()
  @ApiOperation({
    description: 'Create product colors',
  })
  async create(@Body() dto: CreateProductColorDto) {
    return await this.service.create(dto);
  }

  @Patch()
  @ApiOperation({
    description: 'Update product colors',
  })
  async update(@Body() dto: CreateProductColorDto) {
    return await this.service.update(dto);
  }

  @Get()
  @ApiOperation({
    description: 'Get All product colors',
  })
  @ApiOkResponse({
    description: 'Get All product colors',
    type: ProductColorEntity,
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
