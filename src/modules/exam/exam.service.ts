import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { AnswerExamPassDto } from './dto/exam-pass.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { CreateManyExamDto } from './dto/create-many.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamService {
    constructor(private readonly prisma: PrismaService) { }


    async getExamForLessonModule(moduleId: string) {
        const id = Number(moduleId);
        if (isNaN(id)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid module ID'
            });
        }

        const data = await this.prisma.exam.findMany({
            where: {
                lessonModuleId: id
            }
        })
        return {
            success: true,
            message: 'exam success readed !',
            data
        }
    }


    async getAverageCorrectsByCourse(courseId: string) {
        const id = Number(courseId);
        if (isNaN(id)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid course ID'
            });
        }
        const lessonModules = await this.prisma.lessonModule.findMany({
            where: {
                courseId: id
            },
            select: {
                id: true
            }
        });

        const lessonModuleIds = lessonModules.map(lm => lm.id);

        const examResults = await this.prisma.examResult.findMany({
            where: {
                lessonModuleId: { in: lessonModuleIds }
            },
            select: {
                corrects: true
            }
        });

        const total = examResults.reduce((sum, er) => sum + er.corrects, 0);
        const avg = examResults.length > 0 ? total / examResults.length : 0;

        return {
            success: true,
            message: 'avg correct !',
            data: {
                avg: +avg.toFixed(2),
                totalStudents: examResults.length
            }
        };
    }


    async getExamDatails(id: string) {
        const examId = Number(id);
        if (isNaN(examId)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid exam ID'
            });
        }

        const data = await this.prisma.exam.findUnique({
            where: {
                id: examId
            }
        });

        return {
            success: true,
            message: 'exam details readed !',
            data
        }
    }


    async getExamResults() {
        const data = await this.prisma.examResult.findMany();
        return {
            success: true,
            message: 'exam results readed !',
            data
        }
    }


    async getResultsLessonModule(lm_id: string) {
        const id = Number(lm_id);
        if (isNaN(id)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid lesson module ID'
            });
        }

        const data = await this.prisma.examResult.findMany({
            where: {
                lessonModuleId: id
            }
        });

        return {
            success: true,
            message: 'exam results for lesson module readed !',
            data
        }
    }


    async examPass(payload: AnswerExamPassDto, userId: number) {

        const lm = await this.prisma.lessonModule.findFirst({
            where: { id: payload.lessonGroupId }
        });

        if (!lm) {
            throw new NotFoundException({
                success: false,
                message: 'Lesson-Module not found!'
            });
        }

        const questions = await this.prisma.exam.findMany({
            where: { lessonModuleId: lm.id }
        });

        if (questions.length === 0) {
            throw new NotFoundException({
                success: false,
                message: 'Exam not found !'
            });
        }

        let corrects = 0;
        let wrongs = 0;

        for (const answer of payload.answers) {
            const question = questions.find(q => q.id === answer.id);
            if (question) {
                if (question.answer === answer.answer) {
                    corrects++;
                } else {
                    wrongs++;
                }
            }
        }

        const passed = (corrects / questions.length) * 100 >= 70;

        const result = await this.prisma.examResult.create({
            data: {
                usersId: userId,
                lessonModuleId: lm.id,
                corrects,
                wrongs,
                passed
            }
        });

        return {
            success: true,
            message: 'Exam success adedd !',
            data: {
                corrects,
                wrongs,
                passed,
                totalQuestions: questions.length,
                resultId: result.id
            }
        };
    }


    async create(payload: CreateExamDto) {
        await this.prisma.exam.create({
            data: payload
        });

        return {
            success: true,
            message: 'exam created !',
        }
    }


    async createmany(payload: CreateManyExamDto) {
        await this.prisma.exam.createMany({
            data: payload.exams.map(dto => ({
                question: dto.question,
                lessonModuleId: dto.lessonModuleId,
                variantA: dto.variantA,
                variantB: dto.variantB,
                variantC: dto.variantC,
                variantD: dto.variantD,
                answer: dto.answer,
            }))
        });

        return {
            success: true,
            message: 'exams created !',
            count: payload.exams.length
        }
    }


    async updateExam(payload: UpdateExamDto) {
        const exam = await this.prisma.exam.findUnique({
            where: { id: payload.id }
        });

        if (!exam) {
            throw new NotFoundException({
                success: false,
                message: 'Exam not found !'
            });
        }

        await this.prisma.exam.update({
            where: {
                id: payload.id
            },
            data: payload
        });

        return {
            success: true,
            message: 'exam updated !',
        }
    }


    async deleteExam (id: string) {
        const examid = Number(id)
        if(isNaN(examid)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide exam ID !'
            })
        }
        if(!await this.prisma.exam.findUnique({where: {id: examid}})) {
            throw new NotFoundException({
                success: false,
                message: 'exam not found !'
            })
        }
    }
}