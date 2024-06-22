import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartinformationService } from './cartinformation.service';
import { CreateCartinformationDto } from './dto/create-cartinformation.dto';
import { UpdateCartinformationDto } from './dto/update-cartinformation.dto';

@Controller('cartinformation')
export class CartinformationController {
  constructor(private readonly cartinformationService: CartinformationService) {}

  @Post()
  create(@Body() createCartinformationDto: CreateCartinformationDto) {
    return this.cartinformationService.create(createCartinformationDto);
  }

  @Get()
  findAll() {
    return this.cartinformationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartinformationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartinformationDto: UpdateCartinformationDto) {
    return this.cartinformationService.update(+id, updateCartinformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartinformationService.remove(+id);
  }
}
