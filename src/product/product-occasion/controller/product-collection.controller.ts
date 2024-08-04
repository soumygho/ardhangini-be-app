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
import { CreateProductOccassionDto } from '../dto/product-occassion.dto';
import { ProductOccassionsService } from '../service/product-occassions.service';
import { ProductOccassionEntity } from '../entity/product-occassion.entity';

@Controller('product-occassion')
@ApiTags('product-occassion')
export class ProductOccassionController extends BaseController {
  constructor(private readonly service: ProductOccassionsService) {
    super();
  }

  @Post()
  @ApiOperation({
    description: 'Create product Occaasions',
  })
  async create(@Body() dto: CreateProductOccassionDto) {
    return await this.service.create(dto);
  }

  @Patch()
  @ApiOperation({
    description: 'Update product Occaasions',
  })
  async update(@Body() dto: CreateProductOccassionDto) {
    return await this.service.update(dto);
  }

  @Get()
  @ApiOperation({
    description: 'Get All product Occaasions',
  })
  @ApiOkResponse({
    description: 'Get All product Occaasions',
    type: ProductOccassionEntity,
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
