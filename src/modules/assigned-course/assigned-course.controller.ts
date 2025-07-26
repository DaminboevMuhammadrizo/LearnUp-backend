import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AssignedCourseService } from './assigned-course.service';
import { CreateAssignedCourseDto } from './dto/create.dto';
import { UpdateAssignedCourseDto } from './dto/update.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { Roles } from 'src/core/decorators/roles';
import { UserRole } from 'src/common/types/userRole';

@ApiTags('Assigned Courses') 
@Controller('assigned-course')
export class AssignedCourseController {
    constructor(private readonly assignedCourseService: AssignedCourseService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.MENTOR)
    @ApiOperation({ summary: 'Barcha biriktirilgan kurslarni olish' })
    @ApiBearerAuth()
    @Get()
    getAll() {
        return this.assignedCourseService.getAll();
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.MENTOR)    
    @ApiOperation({ summary: 'ID orqali bitta biriktirilgan kursni olish' })
    @ApiBearerAuth()
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.assignedCourseService.getOne(+id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @ApiOperation({ summary: 'Yangi biriktirilgan kurs yaratish' })
    @ApiBearerAuth()
    @Post()
    create(@Body() payload: CreateAssignedCourseDto) {
        return this.assignedCourseService.create(payload);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)  
    @ApiBearerAuth() 
    @ApiOperation({ summary: 'Biriktirilgan kursni yangilash' })
    @Put()
    update(@Body() payload: UpdateAssignedCourseDto) {
        return this.assignedCourseService.update(payload);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)   
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Biriktirilgan kursni o‘chirish' })
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.assignedCourseService.delete(+id);
    }
}
