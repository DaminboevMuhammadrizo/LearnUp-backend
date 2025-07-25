import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExamService } from './exam.service';
import { AnswerExamPassDto } from './dto/exam-pass.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { CreateManyExamDto } from './dto/create-many.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Exams')
@Controller('exam')
export class ExamController {
    constructor(private readonly examService: ExamService) {}

    @ApiOperation({ summary: 'Berilgan moduleId uchun test savollarini olish' })
    @Get(':moduleId')
    getExamForLessonModule(@Param('moduleId') moduleId: string) {
        return this.examService.getExamForLessonModule(moduleId);
    }

    @ApiOperation({ summary: 'Modulega oid o‘rtacha test natijalarini olish' })
    @Get('lesson-module/details/:id')
    getCourseAverageScore(@Param('id') id: string) {
        return this.examService.getAverageCorrectsByCourse(id);
    }

    @ApiOperation({ summary: 'Test tafsilotlarini olish' })
    @Get('detail/:id')
    getExamDatails(@Param('id') id: string) {
        return this.examService.getExamDatails(id);
    }

    @ApiOperation({ summary: 'Barcha test natijalarini olish' })
    @Get('results')
    getExamResults() {
        return this.examService.getExamResults();
    }

    @ApiOperation({ summary: 'Berilgan lesson module uchun test natijalarini olish' })
    @Get('results/lesson-module/:lm_id')
    getResultsLessonModule(@Param('lm_id') lm_id: string) {
        return this.examService.getResultsLessonModule(lm_id);
    }

    @ApiOperation({ summary: 'Testdan o‘tish (javoblarni jo‘natish)' })
    @Post('pass')
    examPass(@Body() payload: AnswerExamPassDto) {
        return this.examService.examPass(payload, 1);
    }

    @ApiOperation({ summary: 'Bitta yangi test yaratish' })
    @Post('create')
    create(@Body() payload: CreateExamDto) {
        return this.examService.create(payload);
    }

    @ApiOperation({ summary: 'Bir nechta testlarni bir vaqtda yaratish' })
    @Post('create/many')
    createmany(@Body() payload: CreateManyExamDto) {
        return this.examService.createmany(payload);
    }

    @ApiOperation({ summary: 'Testni yangilash' })
    @Put('update/:id')
    updateExam(@Body() payload: UpdateExamDto) {
        return this.examService.updateExam(payload);
    }

    @ApiOperation({ summary: 'Testni o‘chirish' })
    @Delete(':id')
    deleteExam(@Param('id') id: string) {
        return this.examService.deleteExam(id);
    }
}
