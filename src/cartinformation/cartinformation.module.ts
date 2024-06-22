import { Module } from '@nestjs/common';
import { CartinformationService } from './cartinformation.service';
import { CartinformationController } from './cartinformation.controller';

@Module({
  controllers: [CartinformationController],
  providers: [CartinformationService],
})
export class CartinformationModule {}
