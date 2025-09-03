import { Body, Controller,  Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryTypesService } from './category-types.service';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateCategoryTypeDto } from './dto/create.dto';
import { UpdateCategoryTypeDto } from './dto/update.dto';

@ApiTags('Category Types')
@Controller('category-types')
export class CategoryTypesController {
  constructor(private readonly categoryTypesService: CategoryTypesService) {}

  @Get('all')
  @ApiOperation({ summary: 'Barcha category-type larni olish' })
  @ApiQuery({ name: 'search', required: false, description: 'Qidiruv' })
  @ApiQuery({ name: 'limit', required: false, description: 'Limit' })
  @ApiQuery({ name: 'offset', required: false, description: 'Offset' })
  getAll(@Query() query: any) {
    return this.categoryTypesService.getAll(query);
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Bitta category-type ni olish' })
  @ApiParam({ name: 'id', description: 'Category-type ID' })
  getOne(@Param('id') id: string) {
    return this.categoryTypesService.getOne(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Yangi category-type yaratish' })
  @ApiBody({ type: CreateCategoryTypeDto })
  create(@Body() payload: CreateCategoryTypeDto) {
    return this.categoryTypesService.create(payload);
  }

  @Put('update')
  @ApiOperation({ summary: 'Category-type ni yangilash' })
  @ApiBody({ type: UpdateCategoryTypeDto })
  update(@Body() payload: UpdateCategoryTypeDto) {
    return this.categoryTypesService.update(payload);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Category-type ni o‘chirish' })
  @ApiParam({ name: 'id', description: 'O‘chiriladigan ID' })
  delete(@Param('id') id: string) {
    return this.categoryTypesService.delete(id);
  }
}
