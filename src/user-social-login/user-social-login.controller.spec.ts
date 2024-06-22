import { Test, TestingModule } from '@nestjs/testing';
import { UserSocialLoginController } from './user-social-login.controller';
import { UserSocialLoginService } from './user-social-login.service';

describe('UserSocialLoginController', () => {
  let controller: UserSocialLoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSocialLoginController],
      providers: [UserSocialLoginService],
    }).compile();

    controller = module.get<UserSocialLoginController>(UserSocialLoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
