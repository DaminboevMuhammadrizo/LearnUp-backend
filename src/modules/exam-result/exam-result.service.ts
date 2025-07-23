import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { Ball, GetExamResultsDto } from './dto/get-exam-results.dto';
import { CreateExamResultDto } from './dto/create.dto';

@Injectable()
export class ExamResultService {
    constructor(private readonly prisma: PrismaService) { }


    async getExamResults(query: GetExamResultsDto) {
        const take = query.limit ?? 10;
        const skip = query.offset ? (query.offset - 1) * take : 0;

        if (query.ball === Ball.MAX || query.ball === Ball.MIN) {
            const order = query.ball === Ball.MAX ? 'desc' : 'asc';

            return this.prisma.examResult.findMany({
                orderBy: { corrects: order },
                skip,
                take,
            });
        }

        return this.prisma.examResult.findMany({
            skip,
            take,
        });
    }


    async getExamResultById(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid ID !',
            });
        }
        const data = await this.prisma.examResult.findUnique({
            where: { id: Number(id) },
        });

        return {
            success: true,
            message: 'exam-result success readedd !',
            data
        }
    }


    async getExamResultsByCourseId(courseId: string) {
        if (isNaN(Number(courseId))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid Course ID!',
            });
        }

        const course = await this.prisma.course.findUnique({
            where: { id: Number(courseId) },
        });

        if (!course) {
            throw new NotFoundException({
                success: false,
                message: 'Course not found!',
            });
        }

        const data = await this.prisma.examResult.findMany({
            where: {
                LessonModule: {
                    courseId: Number(courseId),
                },
            },
            include: {
                Users: true,
                LessonModule: true,
            },
        });

        return {
            success: true,
            message: 'Exam-Results success readedd !',
            data: data,
        };
    }


    async getAvgExamResultsByCourseId(courseId: string) {
        if (isNaN(Number(courseId))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid Course ID!',
            });
        }

        const course = await this.prisma.course.findUnique({
            where: { id: Number(courseId) },
        });

        if (!course) {
            throw new NotFoundException({
                success: false,
                message: 'Course not found!',
            });
        }

        const examResults = await this.prisma.examResult.findMany({
            where: {
                LessonModule: {
                    courseId: Number(courseId),
                },
            },
        });

        if (examResults.length === 0) {
            return {
                success: true,
                message: 'exam-results not found !',
                data: null,
            };
        }

        const total = examResults.length;
        const totalCorrects = examResults.reduce((sum, r) => sum + r.corrects, 0);
        const totalWrongs = examResults.reduce((sum, r) => sum + r.wrongs, 0);
        const passedCount = examResults.filter(r => r.passed).length;

        const averageCorrects = totalCorrects / total;
        const averageWrongs = totalWrongs / total;
        const passRate = (passedCount / total) * 100;

        return {
            success: true,
            message: 'Average exam result seccess !',
            data: {
                totalStudents: total,
                averageCorrects,
                averageWrongs,
                passRate: passRate.toFixed(2) + '%',
            },
        };
    }


    async createExamResult(payload: CreateExamResultDto) {

        const lessonModule = await this.prisma.lessonModule.findUnique({
            where: { id: payload.lessonModuleId },
        });

        if (!lessonModule) {
            throw new NotFoundException({
                success: false,
                message: 'LessonModule not found!',
            });
        }

        const user = await this.prisma.users.findUnique({
            where: { id: payload.usersId },
        });

        if (!user) {
            throw new NotFoundException({
                success: false,
                message: 'User not found!',
            });
        }

        const existing = await this.prisma.examResult.findFirst({
            where: {
                usersId: payload.usersId,
                lessonModuleId: payload.lessonModuleId,
            },
        });

        if (existing) {
            throw new BadRequestException({
                success: false,
                message: 'Exam result already exists for this user and lesson module!',
            });
        }

        const created = await this.prisma.examResult.create({
            data: payload
        });

        return {
            success: true,
            message: 'Exam result successfully created!',
            data: created,
        };
    }


    async updateExamResult(id: string, payload: CreateExamResultDto) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid ID !',
            });
        }

        const existing = await this.prisma.examResult.findUnique({
            where: { id: Number(id) },
        });

        if (!existing) {
            throw new NotFoundException({
                success: false,
                message: 'Exam-result not found!',
            });
        }

        const lessonModule = await this.prisma.lessonModule.findUnique({
            where: { id: payload.lessonModuleId },
        });

        if (!lessonModule) {
            throw new NotFoundException({
                success: false,
                message: 'LessonModule not found!',
            });
        }

        const user = await this.prisma.users.findUnique({
            where: { id: payload.usersId },
        });

        if (!user) {
            throw new NotFoundException({
                success: false,
                message: 'User not found!'
            });
        }

        const duplicate = await this.prisma.examResult.findFirst({
            where: {
                usersId: payload.usersId,
                lessonModuleId: payload.lessonModuleId,
                NOT: { id: Number(id) }
            },
        });

        if (duplicate) {
            throw new BadRequestException({
                success: false,
                message: 'Exam result with this user and lesson module already exists!',
            });
        }


        await this.prisma.examResult.update({
            where: { id: Number(id) },
            data: payload,
        });

        return {
            success: true,
            message: 'Exam result successfully updated!'
        };
    }



    async deleteExamResult(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid ID !',
            });
        }

        const existing = await this.prisma.examResult.findUnique({
            where: { id: Number(id) },
        });

        if (!existing) {
            throw new NotFoundException({
                success: false,
                message: 'Exam-result not found!',
            });
        }

        await this.prisma.examResult.delete({
            where: { id: Number(id) },
        });

        return {
            success: true,
            message: 'Exam result successfully deleted!'
        };
    }
}