import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { GetMineQuestionsDto } from './dto/dget-mine.dto';
import { GetQuestionsCourseDto } from './dto/get-questions-course.dto';
import { CreateQuestionDto } from './dto/create-questions.dto';
import { UpdateQuestionDto } from './dto/update-questions.dto';
import { createQuestionsAnswerDto } from './dto/create-questions-answer.dto';

@Injectable()
export class QuestionService {
    constructor(private readonly prisma: PrismaService) { }


    async getMIneQuestions(query: GetMineQuestionsDto, userId: number) {
        let where: any = {}
        const take = query.limit ?? 10
        const skip = query.offset ? (query.offset - 1) * take : 0

        query.read && (where.read = query.read)
        query.answered && (where.answered = query.answered)
        query.courseId && (where.courseId = query.courseId)
        const data = await this.prisma.question.findMany({
            where,
            skip,
            take
        })

        return {
            success: true,
            message: 'questions success readedd !',
            data
        }
    }


    async getQuestionsFOrCourseId(courseId: string, query: GetQuestionsCourseDto) {
        if (isNaN(Number(courseId))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide course ID !'
            })
        }
        let where: any = {}

        query.read && (where.read = query.read)
        query.answered && (where.answered = query.answered)

        const data = await this.prisma.question.findFirst({ where: { courseId: Number(courseId), ...where } })
        return {
            success: true,
            message: 'qauestions success readedd !',
            data
        }
    }


    async getSingleQuestions(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide course ID !'
            })
        }

        const data = await this.prisma.question.findUnique({ where: { id: Number(id) } })
        return {
            success: true,
            message: 'qauestion success readedd !',
            data
        }
    }



    async readQueastiosn(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide course ID !'
            })
        }

        if (!await this.prisma.question.findUnique({ where: { id: Number(id) } })) {
            throw new BadRequestException({
                success: false,
                message: 'question not found !'
            })
        }

        await this.prisma.question.update({
            where: { id: Number(id) },
            data: { read: true, readAt: new Date() }
        })

        return {
            success: true,
            messga: 'questions success updated !',
        }
    }


    async createQueastiosn(courseId: string, payload: CreateQuestionDto, userId: number, filename?: string) {
        if (isNaN(Number(courseId))) {
            throw new BadRequestException({
                success: false,
                message: 'INvalide course ID'
            })
        }

        const course = await this.prisma.course.findUnique({
            where: { id: Number(courseId) },
        });

        if (!course) {
            throw new NotFoundException({
                success: false,
                message: 'course nit found !'
            })
        }

        const existingQuestion = await this.prisma.question.findFirst({
            where: {
                courseId: Number(courseId),
                usersId: userId,
                text: payload.text,
            },
        });

        if (existingQuestion) {
            throw new ConflictException({
                success: false,
                message: 'Questions alredy exsists !'
            });
        }

        const question = await this.prisma.question.create({
            data: {
                text: payload.text,
                courseId: Number(courseId),
                usersId: userId,
                file: filename ?? null
            },
            include: {
                Course: true,
                questionAnswer: true,
            },
        });

        return {
            success: true,
            data: question
        }
    }



    async updateQuestions(id: string, payload: UpdateQuestionDto, filename?: string) {
        const questionId = Number(id);

        const existingQuestion = await this.prisma.question.findUnique({
            where: { id: questionId },
        });

        if (!existingQuestion) {
            throw new BadRequestException({
                success: false,
                message: 'Questions not found !'
            });
        }

        const updatedData: any = {};

        if (payload.text) {
            updatedData.text = payload.text;
        }

        if (filename) {
            updatedData.file = filename;
        }

        const updatedQuestion = await this.prisma.question.update({
            where: { id: questionId },
            data: updatedData,
            include: {
                Course: true,
                questionAnswer: true,
            },
        });

        return {
            success: true,
            message: 'success updated !',
            data: updatedQuestion
        };
    }


    async createQuestionsAnswer(questionId: string, payload: createQuestionsAnswerDto, userId: number, filename?: string) {
        const id = Number(questionId);
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                messgae: 'Invalide questions ID !'
            })
        }

        const question = await this.prisma.question.findUnique({
            where: { id },
        });

        if (!question) {
            throw new NotFoundException({
                success: false,
                message: 'questions not found !'
            });
        }

        const answer = await this.prisma.questionAnswer.create({
            data: {
                text: payload.text,
                file: filename ?? null,
                questionId: id,
                usersId: userId,
            },
            include: {
                Question: true,
                Users: true,
            },
        });

        return {
            success: true,
            messgae: 'Questions-answer success created !',
            data: answer
        };
    }


    async updateQuestionsAnswer(answerId: string, payload: createQuestionsAnswerDto, userId: number, filename?: string) {
        const id = Number(answerId);
        if (isNaN(id)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid answer ID!',
            });
        }

        const existingAnswer = await this.prisma.questionAnswer.findUnique({
            where: { id },
        });

        if (!existingAnswer) {
            throw new NotFoundException({
                success: false,
                message: 'Answer not found!',
            });
        }

        const updated = await this.prisma.questionAnswer.update({
            where: { id },
            data: {
                text: payload.text,
                file: filename ?? existingAnswer.file,
            },
            include: {
                Question: true,
                Users: true,
            },
        });

        return {
            success: true,
            message: 'Answer updated success !',
            data: updated,
        };
    }


    async deleteQuestions(id: string) {
        const questionId = Number(id);

        if (isNaN(questionId)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid question ID!',
            });
        }

        const existing = await this.prisma.question.findUnique({
            where: { id: questionId },
        });

        if (!existing) {
            throw new NotFoundException({
                success: false,
                message: 'Question not found!',
            });
        }

        await this.prisma.question.delete({
            where: { id: questionId },
        });

        return {
            success: true,
            message: 'Question success deleted !',
        };
    }


    async deleteQuestionsAnswer(id: string) {
        const answerId = Number(id);

        if (isNaN(answerId)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid Questions-answer ID!',
            });
        }

        const existing = await this.prisma.questionAnswer.findUnique({
            where: { id: answerId },
        });

        if (!existing) {
            throw new NotFoundException({
                success: false,
                message: 'Answer not found!',
            });
        }

        await this.prisma.questionAnswer.delete({
            where: { id: answerId },
        });

        return {
            success: true,
            message: 'Answer deleted successfully!',
        };
    }


}
