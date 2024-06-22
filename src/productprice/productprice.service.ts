import { Injectable } from '@nestjs/common';
import { CreateProductpriceDto } from './dto/create-productprice.dto';
import { UpdateProductpriceDto } from './dto/update-productprice.dto';

@Injectable()
export class ProductpriceService {
  create(createProductpriceDto: CreateProductpriceDto) {
    return 'This action adds a new productprice';
  }

  findAll() {
    return `This action returns all productprice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productprice`;
  }

  update(id: number, updateProductpriceDto: UpdateProductpriceDto) {
    return `This action updates a #${id} productprice`;
  }

  remove(id: number) {
    return `This action removes a #${id} productprice`;
  }
}
