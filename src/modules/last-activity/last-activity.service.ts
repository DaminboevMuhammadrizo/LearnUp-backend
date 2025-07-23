import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';

@Injectable()
export class LastActivityService {
    constructor(private readonly prisma: PrismaService) { }


    async getUserLastActivity(userId: string) {
        const userIdNumber = Number(userId)
        if (isNaN(userIdNumber)) {
            throw new BadRequestException({
                success: false,
                message: 'Invalid lesson ID!',
            });
        }

        const activity = await this.prisma.lastActivity.findMany({
            where: { usersId: userIdNumber },
            orderBy: { updatedAt: 'desc' },
            include: {
                Lesson: true,
                LessonModule: true,
                Course: true,
            },
        });

        return {
            success: true,
            data: activity,
        };
    }


    async getUserLastActivityForAdmin() {

        const activity = await this.prisma.lastActivity.findMany({
            orderBy: { updatedAt: 'desc' },
            include: {
                Lesson: true,
                LessonModule: true,
                Course: true,
            },
        });

        return {
            success: true,
            data: activity,
        };
    }
}
