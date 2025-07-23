import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { GetMineQuestionsDto } from './dto/dget-mine.dto';
import { GetQuestionsCourseDto } from './dto/get-questions-course.dto';
import { CreateQuestionDto } from './dto/create-questions.dto';

@Controller('question')
export class QuestionController {
    constructor (private readonly questionService: QuestionService) {}


    @Get('mine')
    getMIneQuestions (@Query() query: GetMineQuestionsDto) {
        return this.questionService.getMIneQuestions(query)
    }


    @Get('course/:courseId')
    getQuestionsFOrCourseId (@Param('courseId') courseId: string, @Query() query: GetQuestionsCourseDto) {
        return this.questionService.getQuestionsFOrCourseId(courseId, query)
    }


    @Get('single/:id')
    getSingleQuestions (@Param('id') id: string) {
        return this.questionService.getSingleQuestions(id)
    }

    @Post('read/:id')
    readQueastiosn (@Param('id') id: string) {
        return this.questionService.readQueastiosn(id)
    }

    @Post('read/:courseId')
    createQueastiosn (@Param('courseId') courseId: string, @Body() payload: CreateQuestionDto) {
        return this.questionService.createQueastiosn(courseId, payload)
    }

    
    

    
}
