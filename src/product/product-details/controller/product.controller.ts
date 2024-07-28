import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { CreateProductResponseDto } from '../dto/create-product-response.dto';
import { ProductSnapshotDto } from '../dto/product-snapshot.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SareeEntity } from '../entities';

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
    type: SareeEntity,
    isArray: true,
  })
  async findAll(
    @Query('pagingRequired', new DefaultValuePipe(false), ParseBoolPipe)
    pagingRequired: boolean = false,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Param('productTypeId') productTypeId: string,
  ): Promise<Pagination<SareeEntity> | SareeEntity[]> {
    if (pagingRequired) {
      return await this.productService.findAll(productTypeId, {
        page,
        limit,
        route: `/product/${productTypeId}`,
      });
    }
    return await this.productService.findAllWithoutPaging(productTypeId);
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
