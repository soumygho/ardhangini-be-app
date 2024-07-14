import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
@ApiTags('product-type')
@Controller('product-type')
export class ProductTypeController extends BaseController {
  constructor(private readonly productTypeService: ProductTypeService) {
    super();
  }

  @Post()
  @ApiOperation({
    description: 'Create Product Type',
  })
  create(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productTypeService.create(createProductTypeDto);
  }

  @Get()
  @ApiOperation({
    description: 'Get All Product Types',
  })
  findAll() {
    return this.productTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Get Product Type by Id',
  })
  findOne(@Param('id') id: string) {
    return this.productTypeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    description: 'Update Product Type by Id',
  })
  update(
    @Param('id') id: string,
    @Body() updateProductTypeDto: UpdateProductTypeDto,
  ) {
    return this.productTypeService.update(id, updateProductTypeDto);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Delete Product Type',
  })
  remove(@Param('id') id: string) {
    return this.productTypeService.remove(id);
  }
}
