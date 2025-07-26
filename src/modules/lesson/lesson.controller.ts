import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { ViewPutDto } from './dto/view-put.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateeLessonDto } from './dto/update-lesson.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles';
import { UserRole } from 'src/common/types/userRole';

@ApiTags('Lessons')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bitta darsni olish' })
  @Get('single/:id')
  getSingleLesson(@Param('id') id: string) {
    return this.lessonService.getSingleLesson(id);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dars ko‘rishlar sonini olish' })
  @Get('views/:id')
  getLessonViews(@Param('id') id: string) {
    return this.lessonService.getLessonViews(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Darsni ko‘rish sifatida belgilash' })
  @Put('view/:id')
  viewLesson(@Param('id') id: string, @Body() payload: ViewPutDto, @Req() req) {
    return this.lessonService.viewLesson(id, payload, req['user'].id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Darsning to‘liq tafsilotlarini olish' })
  @Get('detail/:lessonId')
  getLessonDetail(@Param('lessonId') lessonId: string) {
    return this.lessonService.getLessonDetail(lessonId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi dars yaratish (video bilan)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Dars maʼlumotlari va video fayl',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        moduleId: { type: 'string' },
        order: { type: 'number' },
        video: { type: 'string', format: 'binary' },
      },
    },
  })
  @Post('create')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './uploads/lessons',
        filename: (req, file, cb) => {
          const uniqueName = uuidv4() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new Error('Yaroqsiz video fayl turi!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1000 * 1024 * 1024,
      },
    }),
  )
  createLesson(@Body() payload: CreateLessonDto, @UploadedFile() video: Express.Multer.File) {
    return this.lessonService.createLesson({ ...payload, video: video?.filename });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Darsni yangilash (video bilan)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Yangilanadigan dars maʼlumotlari va yangi video fayl',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        order: { type: 'number' },
        video: { type: 'string', format: 'binary' },
      },
    },
  })
  @Put('update/:id')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './uploads/lessons',
        filename: (req, file, cb) => {
          const uniqueName = uuidv4() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new Error('Yaroqsiz video fayl turi!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1000 * 1024 * 1024,
      },
    }),
  )
  updateLesson(
    @Param('id') id: string,
    @UploadedFile() video: Express.Multer.File,
    @Body() payload: UpdateeLessonDto,
  ) {
    return this.lessonService.updateLesson(id, payload, video?.filename);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Darsni o‘chirish' })
  @Delete('delete/:id')
  deleteLesson(@Param('id') id: string) {
    return this.lessonService.deleteLesson(id);
  }
}
