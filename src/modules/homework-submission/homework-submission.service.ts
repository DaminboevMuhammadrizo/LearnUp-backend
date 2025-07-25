import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateHomeworkSubmissionDto } from './dto/create-hs.dto';
import { GetMineHomewrokSubmissionDto } from './dto/get-mine.dto';
import { GetHomewrokSubmissionsAllQueryDto } from './dto/get-hs-all.dto';

@Injectable()
export class HomeworkSubmissionService {
  constructor(private readonly prisma: PrismaService) {}

  async getMineHomeworkSubmissionForLessson(lessonId: string, query: GetMineHomewrokSubmissionDto, user_id: number) {
    return this.prisma.homeworkSubmission.findMany({
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
  }

  async submitHomeworkSubmission(lessonId: string, payload: CreateHomeworkSubmissionDto, user_id: number) {
    const homework = await this.prisma.homework.findFirst({
      where: { lessonId: +lessonId },
    });

    if (!homework) throw new NotFoundException('Homework not found for this lesson');

    return this.prisma.homeworkSubmission.create({
      data: {
        text: payload.text,
        file: payload.file,
        reason: payload.reason,
        homeworkId: homework.id,
        usersId: user_id,
      },
    });
  }

  async getHomewokSubmissionAll(query: GetHomewrokSubmissionsAllQueryDto) {
    return this.prisma.homeworkSubmission.findMany({
      where: {
        ...(query.lesson_id && {
          Homework: {
            lessonId: +query.lesson_id,
          },
        }),
        ...(query.homework_id && { homeworkId: +query.homework_id }),
        ...(query.user_id && { usersId: +query.user_id }),
      },
      include: {
        Homework: true,
        Users: true,
      },
    });
  }

  async getHomewrokSubmissionSingle(id: string) {
    const submission = await this.prisma.homeworkSubmission.findUnique({
      where: { id: +id },
      include: {
        Homework: true,
        Users: true,
      },
    });

    if (!submission) throw new NotFoundException('Homework submission not found');

    return submission;
  }

  async chekHomewrokSubbmission() {
    return { success: true, message: 'Homework submissions checked.' };
  }
}
