import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductpriceService } from './productprice.service';
import { CreateProductpriceDto } from './dto/create-productprice.dto';
import { UpdateProductpriceDto } from './dto/update-productprice.dto';

@Controller('productprice')
export class ProductpriceController {
  constructor(private readonly productpriceService: ProductpriceService) {}

  @Post()
  create(@Body() createProductpriceDto: CreateProductpriceDto) {
    return this.productpriceService.create(createProductpriceDto);
  }

  @Get()
  findAll() {
    return this.productpriceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productpriceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductpriceDto: UpdateProductpriceDto) {
    return this.productpriceService.update(+id, updateProductpriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productpriceService.remove(+id);
  }
}
