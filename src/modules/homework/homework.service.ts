import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { GetHomeworkQueryDto } from './dto/get-homework-quey.dto';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homewrok.dto';
import { join } from 'path';
import { unlink } from 'fs/promises';


@Injectable()
export class HomeworkService {
    constructor(private readonly prisma: PrismaService) { }


    async getHomeworkByCourseId(courseId: string, query: GetHomeworkQueryDto) {
        const courseIdNumber = Number(courseId);
        if (isNaN(courseIdNumber)) {
            throw new BadRequestException('Invalid course ID');
        }
        const take = query.limit ?? 10
        const skip = query.offset ? (query.offset - 1) * take : 0

        const data = await this.prisma.homework.findMany({
            where: {
                Lesson: {
                    LessonModule: {
                        courseId: courseIdNumber,
                    },
                    ...(query.lessonId && { id: query.lessonId }),
                },
            },
            include: {
                Lesson: {
                    include: {
                        LessonModule: {
                            include: {
                                Course: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take,
            skip
        });

        return {
            success: false,
            messgae: 'homework success readedd !',
            data
        }
    }


    async getHomeworkDetails(homeworkId: string) {
        const id = Number(homeworkId);
        if (isNaN(id)) {
            throw new BadRequestException('Invalid homework ID');
        }

        const homework = await this.prisma.homework.findUnique({
            where: { id },
            include: {
                Lesson: true,
            },
        });

        return {
            succees: false,
            message: 'success readedd !',
            data: homework
        };
    }

    async createHomework(payload: CreateHomeworkDto, filename?: string) {

        if (await this.prisma.homework.findFirst({ where: { lessonId: payload.lessonId } })) {
            throw new BadRequestException({
                success: false,
                message: 'homewrok alredy exsists !'
            })
        }
        if (filename) {
            payload.file = filename;
        }

        const created = await this.prisma.homework.create({ data: payload });

        return {
            success: true,
            message: 'Homework success created !',
        };
    }




    async updateHomework(homeworkId: string, payload: UpdateHomeworkDto, filename?: string) {
        const id = Number(homeworkId);
        if (isNaN(id)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid homework ID!',
            });
        }

        const existing = await this.prisma.homework.findUnique({
            where: { id },
        });

        if (!existing) {
            throw new NotFoundException({
                success: false,
                message: 'Homework not found!',
            });
        }

        if (filename) {
            payload.file = filename;
        }

        await this.prisma.homework.update({
            where: { id },
            data: payload,
        });

        return {
            success: true,
            message: 'Homework updated successfully',
        };
    }


    async deleteHomework(homeworkId: string) {
        const id = Number(homeworkId);
        if (isNaN(id)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid homework ID'
            });
        }

        const existing = await this.prisma.homework.findUnique({ where: { id } });
        if (!existing) {
            throw new NotFoundException({
                success: false,
                message: 'Homework not found'
            });
        }

        if (existing.file) {
            const filePath = join(process.cwd() , 'uploads', 'homeworks', existing.file);
            try {
                await unlink(filePath);
            } catch (err) {
                console.warn(`Faylni ochirib bolmadi: ${existing.file}`, err);
            }
        }

        await this.prisma.homework.delete({ where: { id } });

        return {
            success: true,
            message: 'Homework and attached file (if any) successfully deleted!',
        };
    }


}