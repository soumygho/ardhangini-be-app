import { Test, TestingModule } from '@nestjs/testing';
import { ProductpriceService } from './productprice.service';

describe('ProductpriceService', () => {
  let service: ProductpriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductpriceService],
    }).compile();

    service = module.get<ProductpriceService>(ProductpriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
