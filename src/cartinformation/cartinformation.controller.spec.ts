import { Test, TestingModule } from '@nestjs/testing';
import { CartinformationController } from './cartinformation.controller';
import { CartinformationService } from './cartinformation.service';

describe('CartinformationController', () => {
  let controller: CartinformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartinformationController],
      providers: [CartinformationService],
    }).compile();

    controller = module.get<CartinformationController>(CartinformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
