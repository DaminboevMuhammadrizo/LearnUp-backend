import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AssignedCourseService } from './assigned-course.service';
import { CreateAssignedCourseDto } from './dto/create.dto';
import { UpdateAssignedCourseDto } from './dto/update.dto';

@Controller('assigned-course')
export class AssignedCourseController {
    constructor (private readonly assignedCourseService: AssignedCourseService) {}


    @Get()
    getAll () {
        return this.assignedCourseService.getAll()
    }


    @Get(':id')
    getOne (@Param('id') id: string) {
        return this.assignedCourseService.getOne(+id)
    }


    @Post()
    create (@Body() payload: CreateAssignedCourseDto) {
        return this.assignedCourseService.create(payload)
    }


    @Put()
    update (@Body() payload: UpdateAssignedCourseDto) {
        return this.assignedCourseService.update(payload)
    }


    @Delete(':id')
    delete (@Param('id') id: string) {
        return this.assignedCourseService.delete (+id)
    }
}
