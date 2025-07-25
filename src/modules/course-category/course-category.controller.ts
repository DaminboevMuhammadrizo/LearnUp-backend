import { Controller, Delete, Get, Param, Post, Put, Query, Body } from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { CreateCourseCateforyDto } from './dto/create.dto';
import { UpdateCourseCateforyDto } from './dto/update.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Course Categories')
@Controller('course-category')
export class CourseCategoryController {
    constructor(private readonly courseCategoryService: CourseCategoryService) {}

    @ApiOperation({ summary: 'Barcha kurs kategoriyalarini olish' })
    @Get()
    getAll(@Query() query: GetAllQueryDto) {
        return this.courseCategoryService.getAll(query);
    }

    @ApiOperation({ summary: 'ID orqali kurs kategoriyasini olish' })
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.courseCategoryService.getOne(+id);
    }

    @ApiOperation({ summary: 'Yangi kurs kategoriyasini yaratish' })
    @Post()
    create(@Body() payload: CreateCourseCateforyDto) {
        return this.courseCategoryService.create(payload);
    }

    @ApiOperation({ summary: 'Kurs kategoriyasini yangilash' })
    @Put()
    update(@Body() payload: UpdateCourseCateforyDto) {
        return this.courseCategoryService.update(payload);
    }

    @ApiOperation({ summary: 'Kurs kategoriyasini o‘chirish' })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.courseCategoryService.delete(+id);
    }
}
