import { Test, TestingModule } from '@nestjs/testing';
import { ProductofferService } from './productoffer.service';

describe('ProductofferService', () => {
  let service: ProductofferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductofferService],
    }).compile();

    service = module.get<ProductofferService>(ProductofferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
