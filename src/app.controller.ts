import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseController } from './common';

@Controller()
export class AppController extends BaseController {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Get()
  getApiInformation(): string {
    return this.appService.getApiInformation();
  }
}
