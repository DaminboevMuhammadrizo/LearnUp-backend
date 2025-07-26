import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { QuestionService } from './question.service';
import { GetMineQuestionsDto } from './dto/dget-mine.dto';
import { GetQuestionsCourseDto } from './dto/get-questions-course.dto';
import { CreateQuestionDto } from './dto/create-questions.dto';
import { UpdateQuestionDto } from './dto/update-questions.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { createQuestionsAnswerDto } from './dto/create-questions-answer.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles';
import { UserRole } from 'src/common/types/userRole';

@ApiTags('Questions')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mening savollarim ro‘yxati' })
  @Get('mine')
  getMIneQuestions(@Query() query: GetMineQuestionsDto) {
    return this.questionService.getMIneQuestions(query, 1);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin, Mentor, Assistant' })
  @Get('course/:courseId')
  getQuestionsFOrCourseId(
    @Param('courseId') courseId: string,
    @Query() query: GetQuestionsCourseDto,
  ) {
    return this.questionService.getQuestionsFOrCourseId(courseId, query);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bitta savolni olish' })
  @Get('single/:id')
  getSingleQuestions(@Param('id') id: string) {
    return this.questionService.getSingleQuestions(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Savolni o‘qilgan deb belgilash' })
  @Post('read/:id')
  readQueastiosn(@Param('id') id: string) {
    return this.questionService.readQueastiosn(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT, UserRole.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Savol yaratish (fayl bilan)' })
  @Post('read-course/:courseId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/questions',
        filename: (req, file, cb) => {
          const fileName = uuidv4() + extname(file.originalname);
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'image/jpeg',
          'image/png',
        ];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new Error('Notogri fayl turi!'), false);
        }
        cb(null, true);
      },
    }),
  )
  createQueastiosn(
    @Param('courseId') courseId: string,
    @Body() payload: CreateQuestionDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.questionService.createQueastiosn(
      courseId,
      payload,
      1,
      file?.filename,
    );
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT, UserRole.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Savolni yangilash (fayl bilan)' })
  @Put('update/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/questions',
        filename: (req, file, cb) => {
          const uniqueFileName = uuidv4() + extname(file.originalname);
          cb(null, uniqueFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'text/plain',
        ];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new Error('Yaroqsiz fayl turi!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async updateQuestions(
    @Param('id') id: string,
    @Body() payload: UpdateQuestionDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.questionService.updateQuestions(id, payload, file?.filename);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Savolga javob yozish (fayl bilan)' })
  @Post('answer/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/answers',
        filename: (req, file, cb) => {
          const uniqueFileName = uuidv4() + extname(file.originalname);
          cb(null, uniqueFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'text/plain',
        ];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new Error('Yaroqsiz fayl turi!'), false);
        }
        cb(null, true);
      },
    }),
  )
  createQuestionsAnswer(
    @Param('id') id: string,
    @Body() payload: createQuestionsAnswerDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.questionService.createQuestionsAnswer(
      id,
      payload,
      1,
      file?.filename,
    );
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Javobni yangilash (fayl bilan)' })
  @Put('answer/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/answers',
        filename: (req, file, cb) => {
          const uniqueFileName = uuidv4() + extname(file.originalname);
          cb(null, uniqueFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'text/plain',
        ];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new Error('Yaroqsiz fayl turi!'), false);
        }
        cb(null, true);
      },
    }),
  )
  updateQuestionsAnswer(
    @Param('id') id: string,
    @Body() payload: createQuestionsAnswerDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.questionService.updateQuestionsAnswer(
      id,
      payload,
      1,
      file?.filename,
    );
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Javobni o‘chirish' })
  @Delete('answer/delete/:id')
  deleteQuestionsAnswer(@Param('id') id: string) {
    return this.questionService.deleteQuestionsAnswer(id);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Savolni o‘chirish' })
  @Delete('delete/:id')
  deleteQuestions(@Param('id') id: string) {
    return this.questionService.deleteQuestions(id);
  }
}
