import { Injectable } from '@nestjs/common';
import { CreateCartinformationDto } from './dto/create-cartinformation.dto';
import { UpdateCartinformationDto } from './dto/update-cartinformation.dto';

@Injectable()
export class CartinformationService {
  create(createCartinformationDto: CreateCartinformationDto) {
    return 'This action adds a new cartinformation';
  }

  findAll() {
    return `This action returns all cartinformation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartinformation`;
  }

  update(id: number, updateCartinformationDto: UpdateCartinformationDto) {
    return `This action updates a #${id} cartinformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartinformation`;
  }
}
