import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/common';
import { SubcategoryEntity } from './entities/subcategory.entity';

@ApiTags('Subcategory')
@Controller('subcategory')
export class SubcategoryController extends BaseController {
  constructor(private readonly subcategoryService: SubcategoryService) {
    super();
  }

  @Post()
  @ApiOperation({
    description: 'Create SubCategory',
  })
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return await this.subcategoryService.create(createSubcategoryDto);
  }

  @Get()
  @ApiOperation({
    description: 'Fetch All SubCategories',
  })
  @ApiOkResponse({
    description: 'All Category Response',
    type: SubcategoryEntity,
    isArray: true,
  })
  findAll() {
    return this.subcategoryService.findAll();
  }

  @Get('/category/:categoryId')
  @ApiOperation({
    description: 'Fetch All SubCategories by category',
  })
  @ApiOkResponse({
    description: 'All Category Response',
    type: SubcategoryEntity,
    isArray: true,
  })
  findAllByCategory(@Param('categoryId') categoryId: string) {
    return this.subcategoryService.findByCategory(categoryId);
  }

  @ApiOperation({
    description: 'Fetch All SubCategories',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoryService.findOne(id);
  }

  @ApiOperation({
    description: 'Update a subcategory',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return this.subcategoryService.update(id, updateSubcategoryDto);
  }
  @ApiOperation({
    description: 'Delete a SubCategories',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoryService.remove(id);
  }
}
