import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HomeworkSubmissionService } from './homework-submission.service';
import { GetMineHomewrokSubmissionDto } from './dto/get-mine.dto';
import { CreateHomeworkSubmissionDto } from './dto/create-hs.dto';
import { GetHomewrokSubmissionsAllQueryDto } from './dto/get-hs-all.dto';

@Controller('homework-submission')
export class HomeworkSubmissionController {
    constructor (private readonly homewrokSubmissionService: HomeworkSubmissionService) {}

    @Get('mine/:lessonId')
    getMineHomeworkSubmissionForLessson (@Param('lessonId') lessonId: string, @Query() query: GetMineHomewrokSubmissionDto) {
        return this.homewrokSubmissionService.getMineHomeworkSubmissionForLessson(lessonId, query)
    }


    @Post('submit/:lessonId')
    submitHomeworkSubmission (@Param('lessonId') lessonId: string, @Body() payload: CreateHomeworkSubmissionDto) {
        return this.homewrokSubmissionService.submitHomeworkSubmission(lessonId, payload)
    }


    @Get('submissions/all')
    getHomewokSubmissionAll (@Query() query: GetHomewrokSubmissionsAllQueryDto) {
        return this.homewrokSubmissionService.getHomewokSubmissionAll(query)
    }


    @Get('single/:id')
    getHomewrokSubmissionSingle (@Param('id') id: string) {
        return this.homewrokSubmissionService.getHomewrokSubmissionSingle(id)
    }


    @Post('chek')
    chekHomewrokSubbmission () {
        return this.homewrokSubmissionService.chekHomewrokSubbmission()
    }
}
