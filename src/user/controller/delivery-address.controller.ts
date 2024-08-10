import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { UpdateDeliveryAddressDto } from '../dto/update-delivery-address.dto';
import { DeliveryAddressService } from '../service/delivery-address.service';
import { DeliveryAddressEntity } from '../entities/delivery-address.entity';

@ApiTags('delivery-address')
@Controller('delivery-address')
export class DeliveryAddressController extends BaseController {
  constructor(private readonly service: DeliveryAddressService) {
    super();
  }

  @ApiOperation({
    description: 'Create or Update Delivery address',
  })
  @ApiOkResponse({
    description: 'Delivery Address response',
    type: DeliveryAddressEntity,
    isArray: false,
  })
  @Post('')
  async createOrUpdate(@Body() dto: UpdateDeliveryAddressDto) {
    return await this.service.createOrUpdate(dto);
  }

  @ApiOperation({
    description: 'Get all delivery addresses by userid',
  })
  @ApiOkResponse({
    description: 'Delivery Address response',
    type: DeliveryAddressEntity,
    isArray: true,
  })
  @Get(':userId')
  async getAllByUserId(@Param('userId') userId: string) {
    return await this.service.findAllByUserId(userId);
  }

  @ApiOperation({
    description: 'Delete delivery addresses by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
