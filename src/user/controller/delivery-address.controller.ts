import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';

@ApiTags('delivery-address')
@Controller('delivery-address')
export class DeliveryAddressController extends BaseController {}
