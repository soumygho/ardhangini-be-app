import { Test, TestingModule } from '@nestjs/testing';
import { ProductofferController } from './productoffer.controller';
import { ProductofferService } from './productoffer.service';

describe('ProductofferController', () => {
  let controller: ProductofferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductofferController],
      providers: [ProductofferService],
    }).compile();

    controller = module.get<ProductofferController>(ProductofferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
