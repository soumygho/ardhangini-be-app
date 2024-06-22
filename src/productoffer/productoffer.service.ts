import { Injectable } from '@nestjs/common';
import { CreateProductofferDto } from './dto/create-productoffer.dto';
import { UpdateProductofferDto } from './dto/update-productoffer.dto';

@Injectable()
export class ProductofferService {
  create(createProductofferDto: CreateProductofferDto) {
    return 'This action adds a new productoffer';
  }

  findAll() {
    return `This action returns all productoffer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productoffer`;
  }

  update(id: number, updateProductofferDto: UpdateProductofferDto) {
    return `This action updates a #${id} productoffer`;
  }

  remove(id: number) {
    return `This action removes a #${id} productoffer`;
  }
}
