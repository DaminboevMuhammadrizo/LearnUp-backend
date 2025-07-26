import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CourseService } from './course.service';
import { GetQueryDto } from './dto/get-query.dto';
import { GetAllCourseDto } from './dto/get-all-courses.dto';
import { GetMyCourseDto } from './dto/get-mentor.dto';
import { GetAssignedCoursesDto } from './dto/get-assigned-course.dto';
import { PaginationDto } from './dto/pagination.dto';
import { AssignAssistantDto } from './dto/assign-asssistant.dto';
import { UnassignAssistantDto } from './dto/unsing-assistant.dtpo';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreateCourseDto } from './dto/create.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/common/types/userRole';
import { AuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Roles } from 'src/core/decorators/roles';

@ApiTags('Courses')
@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }


    @ApiOperation({ summary: 'Kurslar roʻyxatini olish (filter bilan)' })
    @Get()
    getAll(@Query() query: GetQueryDto) {
        return this.courseService.getAll(query);
    }


    @ApiOperation({ summary: 'Kursni ID orqali olish' })
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.courseService.getOne(id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.ASSISTANT, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Toʻliq bitta kursni olish' })
    @Get('single-full/:id')
    getSingleFull(@Param('id') id: string) {
        return this.courseService.getSingleFull(id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Barcha kurslarni olish (admin uchun)' })
    @Get('all')
    getAllCourse(@Query() query: GetAllCourseDto) {
        return this.courseService.getAllCourses(query);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Mentorga biriktirilgan kurslar' })
    @Get('my')
    getMyCourses(@Query() query: GetMyCourseDto) {
        return this.courseService.getMyCourses(query);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ASSISTANT, UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Assistentga biriktirilgan kurslar' })
    @Get('my/assigned')
    getAssignedCourses(@Req() req: any, @Query() query: GetAssignedCoursesDto) {
        return this.courseService.getAssignedCourses(req.user.id, query);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Kursga assistentlarni olish (pagination bilan)' })
    @Get(':courseId/assistants')
    getAssistants(
        @Param('courseId') courseId: string,
        @Query() query: PaginationDto,
    ) {
        return this.courseService.getAssistantsByCourse(courseId, query);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Kursga assistent biriktirish' })
    @Post('assign-assistant')
    async assignAssistant(@Body() payload: AssignAssistantDto) {
        return this.courseService.assignAssistant(payload);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Kursdan assistentni ajratish' })
    @Post('unassign-assistant')
    async unassignAssistant(@Body() payload: UnassignAssistantDto) {
        return this.courseService.unassignAssistant(payload);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Yangi kurs yaratish (banner va intro video bilan)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Kurs maʼlumotlari va fayllar',
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                level: { type: 'string' },
                banner: {
                    type: 'string',
                    format: 'binary',
                },
                introVideo: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Post('create')
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'banner', maxCount: 1 },
                { name: 'introVideo', maxCount: 1 },
            ],
            {
                storage: diskStorage({
                    destination: './uploads/courses',
                    filename: (req, file, cb) => {
                        const uniqueName = uuidv4() + extname(file.originalname);
                        cb(null, uniqueName);
                    },
                }),
                fileFilter: (req, file, cb) => {
                    const allowedTypes = [
                        'image/jpeg',
                        'image/png',
                        'video/mp4',
                        'video/mpeg',
                    ];
                    if (!allowedTypes.includes(file.mimetype)) {
                        return cb(
                            new BadRequestException('Yaroqsiz fayl turi yuklandi!'),
                            false,
                        );
                    }
                    cb(null, true);
                },
                limits: {
                    fileSize: 1000 * 1024 * 1024, // ~1GB
                },
            },
        ),
    )
    createCourse(
        @Body() payload: CreateCourseDto,
        @Req() req: any,
        @UploadedFiles()
        files: {
            banner?: Express.Multer.File[];
            introVideo?: Express.Multer.File[];
        },
    ) {
        if (!files.banner || files.banner.length === 0) {
            throw new BadRequestException('Banner fayli majburiy!');
        }
        return this.courseService.createCourse(
            payload,
            req['user'].id,
            {
                banner: files.banner[0].filename,
                introVideo: files.introVideo?.[0]?.filename,
            },
        );
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Kursni chop etish (publish)' })
    @Post('publish/:id')
    async publishCourse(@Param('id') id: string) {
        return this.courseService.publishCourse(id);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Kursni bekor qilish (unpublish)' })
    @Post('unpublish/:id')
    async unpublishCourse(@Param('id') id: string) {
        return this.courseService.unpublishCourse(id);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Kursga mentorni yangilash' })
    @Put('update-mentor')
    async updateMentor(@Body() payload: UpdateMentorDto) {
        return this.courseService.updateMentor(payload);
    }


    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Kursni o‘chirish' })
    @Delete('delete/:id')
    async deleteCourse(@Param('id') id: string) {
        return this.courseService.deleteCourse(Number(id));
    }
}
