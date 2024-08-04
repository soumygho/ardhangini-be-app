import { Repository } from 'typeorm';
import { PromoDetailsEntity } from '../entity/promo-details.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePromoDto } from '../dto/create-promo.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PromoDetailsService {
  constructor(
    @InjectRepository(PromoDetailsEntity)
    private readonly promoDetailsRepository: Repository<PromoDetailsEntity>,
  ) {}

  async create(dto: CreatePromoDto) {
    const entity: PromoDetailsEntity = this.promoDetailsRepository.create();
    Object.assign(entity, dto);
    return await this.promoDetailsRepository.save(entity);
  }

  async getAll() {
    return await this.promoDetailsRepository.find();
  }

  async delete(id: string) {
    return await this.promoDetailsRepository.delete({ id });
  }
}
