import { Test, TestingModule } from '@nestjs/testing';
import { CartinformationService } from './cartinformation.service';

describe('CartinformationService', () => {
  let service: CartinformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartinformationService],
    }).compile();

    service = module.get<CartinformationService>(CartinformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
