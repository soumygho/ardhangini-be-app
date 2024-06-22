import { Test, TestingModule } from '@nestjs/testing';
import { ProductpriceController } from './productprice.controller';
import { ProductpriceService } from './productprice.service';

describe('ProductpriceController', () => {
  let controller: ProductpriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductpriceController],
      providers: [ProductpriceService],
    }).compile();

    controller = module.get<ProductpriceController>(ProductpriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
