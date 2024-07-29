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
import { ProductCollectionService } from '../service/collection.service';
import { CreateProductCollectionDto } from '../dto/create-collection.dto';
import { ProductCollectionEntity } from '../entity/product-collection.entity';

@Controller('product-collection')
@ApiTags('product-collection')
export class ProductColelctionController extends BaseController {
  constructor(private readonly service: ProductCollectionService) {
    super();
  }

  @Post()
  @ApiOperation({
    description: 'Create product collection',
  })
  async create(@Body() dto: CreateProductCollectionDto) {
    return await this.service.create(dto);
  }

  @Patch()
  @ApiOperation({
    description: 'Update product collection',
  })
  async update(@Body() dto: CreateProductCollectionDto) {
    return await this.service.update(dto);
  }

  @Get()
  @ApiOperation({
    description: 'Get All product collection',
  })
  @ApiOkResponse({
    description: 'Get All product collection',
    type: ProductCollectionEntity,
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
