import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ExamResultService } from './exam-result.service';
import { GetExamResultsDto } from './dto/get-exam-results.dto';
import { CreateExamResultDto } from './dto/create.dto';
import { UpdateExamResultDto } from './dto/update.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Exam Results')
@Controller('exam-result')
export class ExamResultController {
    constructor(private readonly examResultservice: ExamResultService) {}

    @ApiOperation({ summary: 'Test natijalarini olish (filter bilan)' })
    @Get()
    getExamResults(@Query() query: GetExamResultsDto) {
        return this.examResultservice.getExamResults(query);
    }

    @ApiOperation({ summary: 'Test natijasini ID orqali olish' })
    @Get(':id')
    getExamResultById(@Param('id') id: string) {
        return this.examResultservice.getExamResultById(id);
    }

    @ApiOperation({ summary: 'Kurs ID bo‘yicha barcha test natijalarini olish' })
    @Get('course/:courseId')
    getExamResultsByCourseId(@Param('courseId') courseId: string) {
        return this.examResultservice.getExamResultsByCourseId(courseId);
    }

    @ApiOperation({ summary: 'Kurs bo‘yicha o‘rtacha test natijalarini olish' })
    @Get('avg/course/:courseId')
    getAvgExamResultsByCourseId(@Param('courseId') courseId: string) {
        return this.examResultservice.getAvgExamResultsByCourseId(courseId);
    }

    @ApiOperation({ summary: 'Yangi test natijasini yaratish' })
    @Post()
    createExamResult(@Body() payload: CreateExamResultDto) {
        return this.examResultservice.createExamResult(payload);
    }

    @ApiOperation({ summary: 'Test natijasini yangilash' })
    @Put(':id')
    updateExamResult(@Param('id') id: string, @Body() payload: UpdateExamResultDto) {
        return this.examResultservice.updateExamResult(id, payload);
    }

    @ApiOperation({ summary: 'Test natijasini o‘chirish' })
    @Delete(':id')
    deleteExamResult(@Param('id') id: string) {
        return this.examResultservice.deleteExamResult(id);
    }
}
