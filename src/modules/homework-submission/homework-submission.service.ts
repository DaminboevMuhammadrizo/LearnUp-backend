import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateHomeworkSubmissionDto } from './dto/create-hs.dto';
import { GetMineHomewrokSubmissionDto } from './dto/get-mine.dto';
import { GetHomewrokSubmissionsAllQueryDto } from './dto/get-hs-all.dto';
import { HomewrokSubmissionChekDto } from './dto/chek-submission.dto';
import { HomeworkSubStatus } from '@prisma/client';

@Injectable()
export class HomeworkSubmissionService {
    constructor(private readonly prisma: PrismaService) { }

    async getMineHomeworkSubmissionForLessson(lessonId: string, query: GetMineHomewrokSubmissionDto, user_id: number) {
        if (isNaN(Number(lessonId))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide Id'
            })
        }

        const data = await this.prisma.homeworkSubmission.findMany({
            where: {
                usersId: user_id,
                Homework: {
                    lessonId: +lessonId,
                },
            },
            include: {
                Homework: true,
            },
        });

        return {
            success: true,
            data
        }
    }


    async submitHomeworkSubmission(lessonId: string, payload: CreateHomeworkSubmissionDto, user_id: number) {
        if(isNaN(Number(lessonId))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide Id !'
            })
        }
        const homework = await this.prisma.homework.findFirst({
            where: { lessonId: +lessonId },
        });

        if (!homework) throw new NotFoundException({
            sucess: false,
            message: 'Homework not found for this lesson'
        });

        await this.prisma.homeworkSubmission.create({
            data: {
                text: payload.text,
                file: payload.file,
                reason: payload.reason,
                homeworkId: homework.id,
                usersId: user_id,
            },
        });

        return {
            success: true,
            message: 'homework sucess submission !'
        }
    }


    async getHomewokSubmissionAll(query: GetHomewrokSubmissionsAllQueryDto) {
        return this.prisma.homeworkSubmission.findMany({
            where: {
                ...(query.lesson_id && {
                    Homework: {
                        lessonId: query.lesson_id,
                    },
                }),
                ...(query.homework_id && { homeworkId: query.homework_id }),
                ...(query.user_id && { usersId: +query.user_id }),
            },
            include: {
                Homework: true,
                Users: true,
            },
        });
    }

    async getHomewrokSubmissionSingle(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide Id'
            })
        }
        const submission = await this.prisma.homeworkSubmission.findUnique({
            where: { id: +id },
            include: {
                Homework: true,
                Users: true,
            },
        });

        if (!submission) throw new NotFoundException({
            sucess: false,
            message: 'Homework submission not found'
        });

        return submission;
    }

    async chekHomewrokSubbmission(payload: HomewrokSubmissionChekDto, userId: number) {
        const submission = await this.prisma.homeworkSubmission.findUnique({
            where: { 
                id: payload.submissionId,
                status: HomeworkSubStatus.PENDING
            },
        });

        if (!submission) {
            throw new NotFoundException({
                success:false, 
                message: 'Homework submission not found'
            });
        }

        const updatedSubmission = await this.prisma.homeworkSubmission.update({
            where: { 
                id: payload.submissionId,
            },
            data: {
                status: payload.approved ? HomeworkSubStatus.APPROVED : HomeworkSubStatus.REJECTED,
                reason: payload.reason,
            },
        });

        return {
            success: true,
            message: 'Homework submission success checked !',
            data: updatedSubmission,
        };
    }

}
