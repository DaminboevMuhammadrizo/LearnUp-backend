import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { LessonModuleService } from './lesson-module.service';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { CreateLessonModuleDto } from './dto/create.dto';
import { UpdateLessonModuleDto } from './dto/update.dto';
import { getMineAllDto } from './dto/get-mine-all.dto';

@Controller('lesson-module')
export class LessonModuleController {
    constructor (private readonly lessonMduleService: LessonModuleService) {}

    @Get('all/:courseId')
    getAll (@Param('courseId') courseId: string, @Query() query: GetAllQueryDto) {
        return this.lessonMduleService.getAll(query, courseId)
    }


    @Get('mine-all/:courseId')
    getMineAll (@Param('courseId') courseId: string, @Query() query: getMineAllDto) {
        return this.lessonMduleService.getMineAll(query, courseId, 1)
    }


    @Get('detail/:id')
    getLessonModuleDetail (@Param('id') id: string) {
        return this.lessonMduleService.getLessonModuleDetail(id, 1)
    }


    @Post('create')
    create (@Body() payload: CreateLessonModuleDto) {
        return this.lessonMduleService.create(payload)
    }


    @Put('update')
    update (@Body() paylod: UpdateLessonModuleDto) {
        return this.lessonMduleService.update(paylod)
    }


    @Delete(':id')
    delete (@Param('id') id: string) {
        return this.lessonMduleService.delete(id)
    }

}
