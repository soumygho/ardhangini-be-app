import { Test, TestingModule } from '@nestjs/testing';
import { UserSocialLoginService } from './user-social-login.service';

describe('UserSocialLoginService', () => {
  let service: UserSocialLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSocialLoginService],
    }).compile();

    service = module.get<UserSocialLoginService>(UserSocialLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
