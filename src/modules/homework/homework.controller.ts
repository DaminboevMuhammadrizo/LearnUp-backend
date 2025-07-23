import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { GetHomeworkQueryDto } from './dto/get-homework-quey.dto';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { UpdateHomeworkDto } from './dto/update-homewrok.dto';

@Controller('homework')
export class HomeworkController {
    constructor(private readonly homeworkService: HomeworkService) { }

    @Get('course/:id')
    getHomeworkByCourseId(@Param('id') courseId: string, @Query() query: GetHomeworkQueryDto) {
        return this.homeworkService.getHomeworkByCourseId(courseId, query);
    }


    @Get('details/:id')
    getHomeworkDetails(@Param('id') homeworkId: string) {
        return this.homeworkService.getHomeworkDetails(homeworkId);
    }


    @Post('create')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads/homeworks',
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
                    'application/vnd.ms-powerpoint',
                    'text/plain',
                    'image/jpeg',
                    'image/png',
                ];
                if (!allowedTypes.includes(file.mimetype)) {
                    return cb(new Error('Yaroqsiz fayl turi!'), false);
                }
                cb(null, true);
            },
        }),
    )
    async createHomework(@Body() payload: CreateHomeworkDto, @UploadedFile() file?: Express.Multer.File) {
        return this.homeworkService.createHomework(payload, file?.filename);
    }


    @Put('update/:id')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads/homeworks',
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
                    'application/vnd.ms-powerpoint',
                    'text/plain',
                    'image/jpeg',
                    'image/png',
                ];
                if (!allowedTypes.includes(file.mimetype)) {
                    return cb(new Error('Yaroqsiz fayl turi!'), false);
                }
                cb(null, true);
            },
        }),
    )
    async updateHomework(
        @Param('id') homeworkId: string,
        @Body() payload: UpdateHomeworkDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        return this.homeworkService.updateHomework(homeworkId, payload, file?.filename);
    }



    @Delete("delete/:id")
    deleteHomework(@Param('id') homeworkId: string) {
        return this.homeworkService.deleteHomework(homeworkId);
    }
}
