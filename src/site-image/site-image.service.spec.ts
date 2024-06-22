import { Test, TestingModule } from '@nestjs/testing';
import { SiteImageService } from './site-image.service';

describe('SiteImageService', () => {
  let service: SiteImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteImageService],
    }).compile();

    service = module.get<SiteImageService>(SiteImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
