import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { BaseController } from 'src/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ManufacturerEntity } from './entities/manufacturer.entity';

@Controller('manufacturer')
@ApiTags('Manufacturer Api')
export class ManufacturerController extends BaseController {
  constructor(private readonly manufacturerService: ManufacturerService) {
    super();
  }

  @Post()
  create(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturerService.create(createManufacturerDto);
  }

  @ApiOkResponse({
    description: 'All Category Response',
    type: ManufacturerEntity,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.manufacturerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManufacturerDto: UpdateManufacturerDto,
  ) {
    return this.manufacturerService.update(id, updateManufacturerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturerService.remove(id);
  }
}
