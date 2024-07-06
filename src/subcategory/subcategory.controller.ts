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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubCategoryDto } from './dto/subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';

@ApiBearerAuth()
@ApiTags('Subcategory')
@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  @ApiOperation({
    description: 'Create SubCategory',
  })
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    const subCategory: Subcategory =
      await this.subcategoryService.create(createSubcategoryDto);
    const subcategoryDto: SubCategoryDto = Object.assign(subCategory);
    return subcategoryDto;
  }

  @Get()
  @ApiOperation({
    description: 'Fetch All SubCategories',
  })
  findAll() {
    return this.subcategoryService.findAll();
  }

  @Get('/category/:categoryId')
  @ApiOperation({
    description: 'Fetch All SubCategories by category',
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
