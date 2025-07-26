import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ExamService } from './exam.service';
import { AnswerExamPassDto } from './dto/exam-pass.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { CreateManyExamDto } from './dto/create-many.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles';
import { UserRole } from 'src/common/types/userRole';

@ApiTags('Exams')
@Controller('exam')
export class ExamController {
    constructor(private readonly examService: ExamService) {}


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.STUDENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Berilgan moduleId uchun test savollarini olish' })
    @Get(':moduleId')
    getExamForLessonModule(@Param('moduleId') moduleId: string) {
        return this.examService.getExamForLessonModule(moduleId);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Modulega oid o‘rtacha test natijalarini olish' })
    @Get('lesson-module/details/:id')
    getCourseAverageScore(@Param('id') id: string) {
        return this.examService.getAverageCorrectsByCourse(id);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Test tafsilotlarini olish' })
    @Get('detail/:id')
    getExamDatails(@Param('id') id: string) {
        return this.examService.getExamDatails(id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Barcha test natijalarini olish' })
    @Get('results')
    getExamResults() {
        return this.examService.getExamResults();
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Berilgan lesson module uchun test natijalarini olish' })
    @Get('results/lesson-module/:lm_id')
    getResultsLessonModule(@Param('lm_id') lm_id: string) {
        return this.examService.getResultsLessonModule(lm_id);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.STUDENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Testdan o‘tish (javoblarni jo‘natish)' })
    @Post('pass')
    examPass(@Body() payload: AnswerExamPassDto) {
        return this.examService.examPass(payload, 1);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Bitta yangi test yaratish' })
    @Post('create')
    create(@Body() payload: CreateExamDto) {
        return this.examService.create(payload);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Bir nechta testlarni bir vaqtda yaratish' })
    @Post('create/many')
    createmany(@Body() payload: CreateManyExamDto) {
        return this.examService.createmany(payload);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Testni yangilash' })
    @Put('update/:id')
    updateExam(@Body() payload: UpdateExamDto) {
        return this.examService.updateExam(payload);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Testni o‘chirish' })
    @Delete(':id')
    deleteExam(@Param('id') id: string) {
        return this.examService.deleteExam(id);
    }
}
