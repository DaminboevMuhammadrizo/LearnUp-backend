import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { HomeworkSubmissionService } from './homework-submission.service';
import { GetMineHomewrokSubmissionDto } from './dto/get-mine.dto';
import { GetHomewrokSubmissionsAllQueryDto } from './dto/get-hs-all.dto';
import { CreateHomeworkSubmissionDto } from './dto/create-hs.dto';
import { HomewrokSubmissionChekDto } from './dto/chek-submission.dto';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { UserRole } from 'src/common/types/userRole';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('homework-submission')
export class HomeworkSubmissionController {
    constructor(private readonly homewrokSubmissionService: HomeworkSubmissionService) { }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.STUDENT)
    @ApiBearerAuth()
    @Get('mine/:lessonId')
    getMineHomeworkSubmissionForLessson(@Param('lessonId') lessonId: string, @Query() query: GetMineHomewrokSubmissionDto, @Req() req: Request) {
        return this.homewrokSubmissionService.getMineHomeworkSubmissionForLessson(lessonId, query, req['user'].id)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.STUDENT)
    @ApiBearerAuth()
    @Post('submit/:lessonId')
    submitHomeworkSubmission(@Param('lessonId') lessonId: string, @Body() payload: CreateHomeworkSubmissionDto, @Req() req: Request) {
        return this.homewrokSubmissionService.submitHomeworkSubmission(lessonId, payload, req['user'].id)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.STUDENT, UserRole.ASSISTANT)
    @ApiBearerAuth()
    @Get('submissions/all')
    getHomewokSubmissionAll(@Query() query: GetHomewrokSubmissionsAllQueryDto) {
        return this.homewrokSubmissionService.getHomewokSubmissionAll(query)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT)
    @ApiBearerAuth()
    @Get('single/:id')
    getHomewrokSubmissionSingle(@Param('id') id: string) {
        return this.homewrokSubmissionService.getHomewrokSubmissionSingle(id)
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT)
    @ApiBearerAuth()
    @Post('chek')
    chekHomewrokSubbmission(@Body() payload: HomewrokSubmissionChekDto, @Req() req) {
        return this.homewrokSubmissionService.chekHomewrokSubbmission(payload, req['user'].id)
    }
}
