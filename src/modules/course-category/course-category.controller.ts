import { Controller, Delete, Get, Param, Post, Put, Query, Body, UseGuards } from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { CreateCourseCateforyDto } from './dto/create.dto';
import { UpdateCourseCateforyDto } from './dto/update.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles';
import { UserRole } from 'src/common/types/userRole';

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


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Yangi kurs kategoriyasini yaratish' })
    @Post()
    create(@Body() payload: CreateCourseCateforyDto) {
        return this.courseCategoryService.create(payload);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Kurs kategoriyasini yangilash' })
    @Put()
    update(@Body() payload: UpdateCourseCateforyDto) {
        return this.courseCategoryService.update(payload);
    }

    
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Kurs kategoriyasini o‘chirish' })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.courseCategoryService.delete(+id);
    }
}
