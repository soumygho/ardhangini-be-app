import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { CreateProductResponseDto } from '../dto/create-product-response.dto';
import { ProductSnapshotDto } from '../dto/product-snapshot.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController extends BaseController {
  constructor(private readonly productService: ProductService) {
    super();
  }

  @Post()
  @ApiOkResponse({
    description: 'Create/update Product Response',
    type: CreateProductResponseDto,
    isArray: false,
  })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<CreateProductResponseDto> {
    return await this.productService.createOrUpdate(createProductDto);
  }

  @Get(':productTypeId')
  @ApiOkResponse({
    description: 'All Product Response',
    type: ProductSnapshotDto,
    isArray: true,
  })
  async findAll(@Param('productTypeId') productTypeId: string) {
    return await this.productService.findAll(productTypeId);
  }

  @ApiOkResponse({
    description: 'Product Response',
    type: ProductSnapshotDto,
    isArray: false,
  })
  @Get(':productTypeId/:id')
  findOne(
    @Param('productTypeId') productTypeId: string,
    @Param('id') id: string,
  ) {
    return this.productService.findOne(productTypeId, id);
  }

  @Delete(':productTypeId/:id')
  remove(
    @Param('productTypeId') productTypeId: string,
    @Param('id') id: string,
  ) {
    return this.productService.remove(productTypeId, id);
  }
}
