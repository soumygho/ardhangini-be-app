import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { FabricService } from '../service/fabric.service';
import { CreateFabricDto } from '../dto/create-fabric.dto';
import { FabricDetailsEntity } from '../entity/fabric-details.entity';

@Controller('fabric-details')
@ApiTags('Fabric details Api')
export class FabricController extends BaseController {
  constructor(private readonly fabricService: FabricService) {
    super();
  }

  @Post()
  create(@Body() dto: CreateFabricDto) {
    return this.fabricService.create(dto);
  }

  @ApiOkResponse({
    description: 'All fabric Response',
    type: FabricDetailsEntity,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.fabricService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fabricService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateFabricDto) {
    return this.fabricService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fabricService.delete(id);
  }
}
