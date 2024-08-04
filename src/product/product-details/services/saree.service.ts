import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { SareeEntity } from '../entities';
import { SareeDetailsMapper } from '../mapper/saree-details.mapper';

@Injectable()
export class SareeService {
  constructor(
    private readonly sareeRepository: Repository<SareeEntity>,
    private readonly sareeMapper: SareeDetailsMapper,
  ) {}
  async getAll(request: Request) {
    if (request.params['user']) {
      //authenticated user
      return (await this.sareeRepository.find()).map((sareeEntity) =>
        this.sareeMapper.mapAndEnrichWithUserData(
          request.params['user'],
          sareeEntity,
        ),
      );
    }
    return (await this.sareeRepository.find()).map((sareeEntity) =>
      this.sareeMapper.mapFrom(sareeEntity),
    );
  }
}
