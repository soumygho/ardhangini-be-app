import { Test, TestingModule } from '@nestjs/testing';
import { SiteImageController } from './site-image.controller';
import { SiteImageService } from './site-image.service';

describe('SiteImageController', () => {
  let controller: SiteImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteImageController],
      providers: [SiteImageService],
    }).compile();

    controller = module.get<SiteImageController>(SiteImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
