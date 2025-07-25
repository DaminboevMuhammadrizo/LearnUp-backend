import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { HomeworkSubmissionService } from './homework-submission.service';
import { GetMineHomewrokSubmissionDto } from './dto/get-mine.dto';
import { GetHomewrokSubmissionsAllQueryDto } from './dto/get-hs-all.dto';
import { CreateHomeworkSubmissionDto } from './dto/create-hs.dto';

@Controller('homework-submission')
export class HomeworkSubmissionController {
    constructor (private readonly homewrokSubmissionService: HomeworkSubmissionService) {}

    @Get('mine/:lessonId')
    getMineHomeworkSubmissionForLessson (@Param('lessonId') lessonId: string, @Query() query: GetMineHomewrokSubmissionDto, @Req() req: Request) {
        return this.homewrokSubmissionService.getMineHomeworkSubmissionForLessson(lessonId, query, req['user'].id)
    }


    @Post('submit/:lessonId')
    submitHomeworkSubmission (@Param('lessonId') lessonId: string, @Body() payload: CreateHomeworkSubmissionDto, @Req() req: Request) {
        return this.homewrokSubmissionService.submitHomeworkSubmission(lessonId, payload, req['user'].id)
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
