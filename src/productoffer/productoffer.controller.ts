import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductofferService } from './productoffer.service';
import { CreateProductofferDto } from './dto/create-productoffer.dto';
import { UpdateProductofferDto } from './dto/update-productoffer.dto';

@Controller('productoffer')
export class ProductofferController {
  constructor(private readonly productofferService: ProductofferService) {}

  @Post()
  create(@Body() createProductofferDto: CreateProductofferDto) {
    return this.productofferService.create(createProductofferDto);
  }

  @Get()
  findAll() {
    return this.productofferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productofferService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductofferDto: UpdateProductofferDto) {
    return this.productofferService.update(+id, updateProductofferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productofferService.remove(+id);
  }
}
