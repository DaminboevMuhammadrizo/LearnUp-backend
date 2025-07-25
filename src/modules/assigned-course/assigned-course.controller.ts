import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AssignedCourseService } from './assigned-course.service';
import { CreateAssignedCourseDto } from './dto/create.dto';
import { UpdateAssignedCourseDto } from './dto/update.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Assigned Courses') // Swagger'da grouping uchun
@Controller('assigned-course')
export class AssignedCourseController {
    constructor(private readonly assignedCourseService: AssignedCourseService) {}

    @ApiOperation({ summary: 'Barcha biriktirilgan kurslarni olish' })
    @Get()
    getAll() {
        return this.assignedCourseService.getAll();
    }

    @ApiOperation({ summary: 'ID orqali bitta biriktirilgan kursni olish' })
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.assignedCourseService.getOne(+id);
    }

    @ApiOperation({ summary: 'Yangi biriktirilgan kurs yaratish' })
    @Post()
    create(@Body() payload: CreateAssignedCourseDto) {
        return this.assignedCourseService.create(payload);
    }

    @ApiOperation({ summary: 'Biriktirilgan kursni yangilash' })
    @Put()
    update(@Body() payload: UpdateAssignedCourseDto) {
        return this.assignedCourseService.update(payload);
    }

    @ApiOperation({ summary: 'Biriktirilgan kursni o‘chirish' })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.assignedCourseService.delete(+id);
    }
}
