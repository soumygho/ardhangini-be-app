import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BaseController } from 'src/common';
import { WishListService } from '../service/wish-list.service';
import { WishListDetailsResponse } from '../dto/wishlist-response.dto';
import { WishListUpdateDto } from '../dto/wishlist-update.dto';

@ApiTags('wish-list')
@Controller('wish-list')
export class WishListController extends BaseController {
  constructor(private readonly service: WishListService) {
    super();
  }

  @ApiOperation({
    description: 'WishList Response by userid',
  })
  @ApiOkResponse({
    description: 'WishList Response',
    type: WishListDetailsResponse,
    isArray: false,
  })
  @Get(':userId')
  async getWishListByUserId(@Param('userId') userId: string) {
    return await this.service.getWishList(userId);
  }

  @ApiOperation({
    description: 'AddToWishList',
  })
  @ApiOkResponse({
    description: 'WishList Response',
    type: WishListDetailsResponse,
    isArray: false,
  })
  @Post('add')
  async addToWishList(@Body() dto: WishListUpdateDto) {
    return await this.service.addOrUpdateWishList(dto);
  }

  @ApiOperation({
    description: 'RemoveFromWishList',
  })
  @ApiOkResponse({
    description: 'WishList Response',
    type: WishListDetailsResponse,
    isArray: false,
  })
  @Post('remove')
  async removeFrom(@Body() dto: WishListUpdateDto) {
    return await this.service.removeFromWishList(dto);
  }
}
