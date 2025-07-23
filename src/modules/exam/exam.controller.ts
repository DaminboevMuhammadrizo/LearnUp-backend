import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExamService } from './exam.service';
import { AnswerExamPassDto } from './dto/exam-pass.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { CreateManyExamDto } from './dto/create-many.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller('exam')
export class ExamController {
    constructor (private readonly examService: ExamService) {}

    @Get(':moduleId')
    getExamForLessonModule (@Param('moduleId') moduleId: string) {
        return this.examService.getExamForLessonModule(moduleId)
    }
    

    @Get('lesson-module/details:/id')
    getCourseAverageScore (@Param('id') id: string) {
        return this.examService.getAverageCorrectsByCourse(id)
    }


    @Get('detail/:id')
    getExamDatails (@Param('id') id: string) {
        return this.examService.getExamDatails(id)
    }


    @Get('results')
    getExamResults () {
        return this.examService.getExamResults()
    }


    @Get('results/lesson-module/:lm_id')
    getResultsLessonModule (@Param('lm_id') lm_id: string) {
        return this.examService.getResultsLessonModule(lm_id)
    }


    @Post('pass')
    examPass (@Body() payload: AnswerExamPassDto) {
        return this.examService.examPass(payload, 1)
    }


    @Post('create')
    create(@Body() payload: CreateExamDto) {
        return this.examService.create(payload)
    }


    @Post('create/many')
    createmany (@Body() payload: CreateManyExamDto) {
        return this.examService.createmany(payload)
    }

    
    @Put('update/:id')
    updateExam (@Body() payload: UpdateExamDto) {
        return this.examService.updateExam(payload)
    }


    @Delete(':id')
    deleteExam (@Param('id') id: string) {
        return this.examService.deleteExam(id)
    }
    
}
