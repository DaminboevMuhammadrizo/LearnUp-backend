import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { GetHomeworkQueryDto } from './dto/get-homework-quey.dto';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homewrok.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { UserRole } from 'src/common/types/userRole';
import { Roles } from 'src/core/decorators/roles';

@ApiTags('Homework')
@Controller('homework')
export class HomeworkController {
    constructor(private readonly homeworkService: HomeworkService) { }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT, UserRole.STUDENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Kurs ID bo‘yicha barcha uy vazifalarini olish' })
    @Get('course/:id')
    getHomeworkByCourseId(
        @Param('id') courseId: string,
        @Query() query: GetHomeworkQueryDto,
    ) {
        return this.homeworkService.getHomeworkByCourseId(courseId, query);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.ASSISTANT, UserRole.STUDENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Uy vazifasi tafsilotlarini olish' })
    @Get('details/:id')
    getHomeworkDetails(@Param('id') homeworkId: string) {
        return this.homeworkService.getHomeworkDetails(homeworkId);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Yangi uy vazifasini yaratish (fayl bilan)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Uy vazifasi maʼlumotlari va fayl',
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                deadline: { type: 'string', format: 'date-time' },
                courseId: { type: 'string' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
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
    createHomework(
        @Body() payload: CreateHomeworkDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        return this.homeworkService.createHomework(payload, file?.filename);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Uy vazifasini yangilash (fayl bilan)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Yangilangan uy vazifasi maʼlumotlari va fayl',
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                deadline: { type: 'string', format: 'date-time' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
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
    updateHomework(
        @Param('id') homeworkId: string,
        @Body() payload: UpdateHomeworkDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        return this.homeworkService.updateHomework(
            homeworkId,
            payload,
            file?.filename,
        );
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Uy vazifasini o‘chirish' })
    @Delete('delete/:id')
    deleteHomework(@Param('id') homeworkId: string) {
        return this.homeworkService.deleteHomework(homeworkId);
    }
}
