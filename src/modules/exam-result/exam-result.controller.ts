import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ExamResultService } from './exam-result.service';
import { GetExamResultsDto } from './dto/get-exam-results.dto';
import { CreateExamResultDto } from './dto/create.dto';
import { UpdateExamResultDto } from './dto/update.dto';

@Controller('exam-result')
export class ExamResultController {
    constructor (private readonly examResultservice: ExamResultService) {}

    @Get()
    getExamResults(@Query() query: GetExamResultsDto) {
        return this.examResultservice.getExamResults(query);
    }


    @Get(':id')
    getExamResultById(id: string) {
        return this.examResultservice.getExamResultById(id);
    }

    @Get('course/:courseId')
    getExamResultsByCourseId(courseId: string) {
        return this.examResultservice.getExamResultsByCourseId(courseId);
    }


    @Get('avg/course/:courseId')
    getAvgExamResultsByCourseId(courseId: string) {
        return this.examResultservice.getAvgExamResultsByCourseId(courseId);
    }


    @Post()
    createExamResult(@Body() payload: CreateExamResultDto) {
        return this.examResultservice.createExamResult(payload);
    }


    @Put(':id')
    updateExamResult(@Param('id') id: string, @Body() payload: UpdateExamResultDto) {
        return this.examResultservice.updateExamResult(id, payload);
    }


    @Delete(':id')
    deleteExamResult(@Param('id') id: string) {
        return this.examResultservice.deleteExamResult(id);
    }

}
