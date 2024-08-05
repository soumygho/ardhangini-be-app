import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartService } from '../service/cart.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartDetailsResponse } from '../dto/cart-response.dto';
import { CartUpdateDto } from '../dto/cart-update.dto';
import { BaseController } from 'src/common';

@ApiTags('cart')
@Controller('cart')
export class CartController extends BaseController {
  constructor(private readonly service: CartService) {
    super();
  }

  @ApiOperation({
    description: 'Cart Response by userid',
  })
  @ApiOkResponse({
    description: 'Cart Response',
    type: CartDetailsResponse,
    isArray: false,
  })
  @Get(':userId')
  async getCartByUserId(@Param('userId') userId: string) {
    return await this.service.getCartDetails(userId);
  }

  @ApiOperation({
    description: 'AddToCart',
  })
  @ApiOkResponse({
    description: 'Cart Response',
    type: CartDetailsResponse,
    isArray: false,
  })
  @Post('add')
  async addToCart(@Body() dto: CartUpdateDto) {
    return await this.service.addOrEditItemInCart(dto);
  }

  @ApiOperation({
    description: 'RemoveFromCart',
  })
  @ApiOkResponse({
    description: 'Cart Response',
    type: CartDetailsResponse,
    isArray: false,
  })
  @Post('remove')
  async removeFromCart(@Body() dto: CartUpdateDto) {
    return await this.service.deleteFromCart(dto);
  }
}
