import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { ViewPutDto } from './dto/view-put.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonModuleDto } from '../lesson-module/dto/update.dto';

@Injectable()
export class LessonService {
    constructor(private readonly prisma: PrismaService) { }


    async getSingleLesson(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                succeess: false,
                message: 'Invalid lesson ID !',
            });
        }
        const data = await this.prisma.lesson.findUnique({ where: { id: Number(id) } });
        return {
            success: true,
            message: 'Lesson success readedd !',
            data,
        };
    }


    async getLessonViews(id: string) {
        const lessonId = Number(id);

        if (isNaN(lessonId)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid lesson ID!',
            });
        }

        const lesson = await this.prisma.lesson.findUnique({
            where: { id: lessonId },
        });

        if (!lesson) {
            throw new NotFoundException({
                success: false,
                message: 'Lesson not found!',
            });
        }

        const views = await this.prisma.lessonView.findMany({
            where: { lessonId },
            include: {
                Users: true
            },
        });

        return {
            success: true,
            message: 'Lesson views successfully fetched!',
            data: views,
        };
    }



    async viewLesson(lessonId: string, payload: ViewPutDto, usersId: string) {
        const lessonIdNumber = Number(lessonId);
        const userId = Number(usersId);

        if (isNaN(lessonIdNumber)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid lesson ID!',
            });
        }

        if (isNaN(userId)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid user ID!',
            });
        }

        const lesson = await this.prisma.lesson.findUnique({
            where: { id: lessonIdNumber },
            select: {
                lessonModuleId: true,
                LessonModule: {
                    select: { courseId: true },
                },
            },
        });

        if (!lesson || !lesson.LessonModule) {
            throw new NotFoundException({
                success: false,
                message: 'Lesson or related LessonModule not found!',
            });
        }

        const where = {
            lessonId_usersId: {
                lessonId: lessonIdNumber,
                usersId: userId,
            },
        };

        const existingView = await this.prisma.lessonView.findUnique({ where });

        if (existingView) {
            await this.prisma.lessonView.update({
                where,
                data: { view: payload.view },
            });
        } else {
            await this.prisma.lessonView.create({
                data: {
                    lessonId: lessonIdNumber,
                    usersId: userId,
                    view: payload.view,
                },
            });
        }

        await this.prisma.lastActivity.upsert({
            where: {
                usersId_lessonId: {
                    usersId: userId,
                    lessonId: lessonIdNumber,
                },
            },
            update: {
                updatedAt: new Date(),
                url: payload.url ?? undefined,
            },
            create: {
                usersId: userId,
                lessonId: lessonIdNumber,
                lessonModuleId: lesson.lessonModuleId,
                courseId: lesson.LessonModule.courseId,
                url: payload.url ?? undefined,
            },
        });

        return {
            success: true,
            message: existingView ? 'Lesson view updated!' : 'Lesson view created!',
        };
    }





    async getLessonDetail(id: string) {
        const lessonId = Number(id);

        if (isNaN(lessonId)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid lesson ID!',
            });
        }

        const data = await this.prisma.lesson.findUnique({
            where: { id: lessonId },
            include: {
                LessonModule: true,
                lastActivity: true,
                lessonView: true,
                lessonFile: true,
                homework: true,
            },
        });

        if (!data) {
            throw new NotFoundException({
                success: false,
                message: 'Lesson not found!',
            });
        }

        return {
            success: true,
            message: 'Lesson detail successfully retrieved!',
            data: data,
        };
    }



    async createLesson(payload: CreateLessonDto) {

        const lessonModule = await this.prisma.lessonModule.findUnique({
            where: { id: payload.lessonModuleId },
        });

        if (!lessonModule) {
            throw new NotFoundException({
                success: false,
                message: 'Lesson module not found!',
            });
        }

        const data = await this.prisma.lesson.create({
            data: payload
        });

        return {
            success: true,
            message: 'Lesson successfully created!',
            data: data,
        };
    }


    async updateLesson(id: string, payload: UpdateLessonModuleDto) {
        const lessonId = Number(id);

        if (isNaN(lessonId)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid lesson ID!',
            });
        }

        const existingLesson = await this.prisma.lesson.findUnique({
            where: { id: lessonId },
        });

        if (!existingLesson) {
            throw new NotFoundException({
                success: false,
                message: 'Lesson not found!',
            });
        }

        const updatedLesson = await this.prisma.lesson.update({
            where: { id: lessonId },
            data: payload,
        });

        return {
            success: true,
            message: 'Lesson successfully updated!',
            data: updatedLesson,
        };
    }


    async deleteLesson(id: string) {
        const lessonId = Number(id);

        if (isNaN(lessonId)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid lesson ID!',
            });
        }

        const existingLesson = await this.prisma.lesson.findUnique({
            where: { id: lessonId },
        });

        if (!existingLesson) {
            throw new NotFoundException({
                success: false,
                message: 'Lesson not found!',
            });
        }

        await this.prisma.lesson.delete({
            where: { id: lessonId },
        });

        return {
            success: true,
            message: 'Lesson successfully deleted!',
        };
    }


}
