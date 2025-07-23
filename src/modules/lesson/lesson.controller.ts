import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { ViewPutDto } from './dto/view-put.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateeLessonDto } from './dto/update-lesson.dto';

@Controller('lesson')
export class LessonController {
    constructor (private readonly lessonService: LessonService) {}

    @Get('single/:id')
    getSingleLesson(id: string) {
        return this.lessonService.getSingleLesson(id);
    }


    @Get('views/:id')
    getLessonViews(id: string) {
        return this.lessonService.getLessonViews(id);
    }


    @Put('view/:id')
    viewLesson(id: string, @Body() payload: ViewPutDto) {
        return this.lessonService.viewLesson(id, payload, '1');
    }


    @Get('detail/:lessonId')
    getLessonDetail(lessonId: string) {
        return this.lessonService.getLessonDetail(lessonId);
    }


    @Post('create')
    createLesson(@Body() payload: CreateLessonDto) {
        return this.lessonService.createLesson(payload);
    }


    @Put('update/:id')
    updateLesson(id: string, @Body() payload: UpdateeLessonDto) {
        return this.lessonService.updateLesson(id, payload);
    }


    @Delete('delete/:id')
    deleteLesson(id: string) {
        return this.lessonService.deleteLesson(id);
    }
}
