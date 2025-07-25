import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { LessonFileService } from './lesson-file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreateLessonFileDto } from './dto/lesson-file.create.dto';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Lesson Files')
@Controller('lesson-file')
export class LessonFileController {
  constructor(private readonly lessonFileSerivce: LessonFileService) {}

  @ApiOperation({ summary: 'Darsga biriktirilgan barcha fayllarni olish' })
  @Get('lesson/:lessonId')
  async getLessonFiles(@Param('lessonId') lessonId: string) {
    return this.lessonFileSerivce.getByLessonId(lessonId);
  }

  @ApiOperation({ summary: 'Bir nechta faylni yuklash (1 dars uchun)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Fayllar va darsga oid maʼlumotlar',
    schema: {
      type: 'object',
      properties: {
        lessonId: { type: 'string' },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'lesson-files'),
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${uuidv4()}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadLessonFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateLessonFileDto,
  ) {
    return this.lessonFileSerivce.uploadLessonFiles(body, files);
  }

  @ApiOperation({ summary: 'Faylni o‘chirish' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.lessonFileSerivce.delete(id);
  }
}
