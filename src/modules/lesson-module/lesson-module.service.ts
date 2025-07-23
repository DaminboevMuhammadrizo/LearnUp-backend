import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { getMineAllDto } from './dto/get-mine-all.dto';
import { CreateLessonModuleDto } from './dto/create.dto';
import { UpdateLessonModuleDto } from './dto/update.dto';

@Injectable()
export class LessonModuleService {
    constructor(
        private readonly prisma: PrismaService
    ) {}



    async getAll(query: GetAllQueryDto, courseId: string) {

        if (isNaN(Number(courseId))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide Id !'
            })
        }

        const take = query.limit ?? 10
        const skip = query.offset ? (query.offset - 1) * take : 0

        const data = await this.prisma.lessonModule.findMany({
            where: {
                courseId: Number(courseId)
            },
            take,
            skip
        })

        return {
            success: true,
            message: 'lesson-Module success readed !',
            data
        }
    }



    async getMineAll(query: getMineAllDto, courseId: string, userId: number) {
        if (isNaN(Number(courseId))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide Id !'

            })
        }

        const take = query.limit ?? 10
        const skip = query.offset ? (query.offset - 1) * take : 0

        if (!await this.prisma.users.findUnique({ where: { id: userId } })) {
            throw new NotFoundException({
                success: false,
                message: 'user not found !'
            })
        }

        if (!await this.prisma.course.findUnique({ where: { id: query.courseId } })) {
            throw new NotFoundException({
                success: false,
                message: 'course not found !'
            })
        }

        const data = await this.prisma.lessonModule.findMany({
            where: {
                courseId: query.courseId,
                Course: {
                    assignedCourse: {
                        some: {
                            usersId: userId
                        },
                    }
                }
            },
            skip, take, orderBy: { createdAt: 'desc' },
            include: query.include_lesson ? { lesson: true } : undefined
        })

        return {
            success: true,
            message: 'lesson-Module success readed !',
            data
        }
    }



    async getLessonModuleDetail(id: string, userId: number) {

        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide Id !'
            })
        }

        if (!await this.prisma.users.findUnique({ where: { id: userId } })) {
            throw new NotFoundException({
                success: false,
                message: 'user not found !'
            })
        }

        const data = await this.prisma.lessonModule.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                exam: true,
                examResult: true,
                lastActivity: true,
                lesson: true
            }
        })

        return {
            success: true,
            message: 'lesson-Module success readed !',
            data
        }
    }



    async create(payload: CreateLessonModuleDto) {
        if (await this.prisma.lessonModule.findFirst({ where: { name: payload.name } })) {
            throw new ConflictException({
                success: false,
                message: 'lessonModule name alredy exsists !'
            })
        }

        await this.prisma.lessonModule.create({ data: payload })
        return {
            success: true,
            message: 'lesson-Module success created !'
        }
    }



    async update(payload: UpdateLessonModuleDto) {
        if (!await this.prisma.lessonModule.findUnique({ where: { id: payload.id } })) {
            throw new NotFoundException({
                success: false,
                message: 'lesson-Module not found !'
            })
        }

        if (await this.prisma.lessonModule.findFirst({ where: { name: payload.name } })) {
            throw new ConflictException({
                success: false,
                message: 'lessonModule name alredy exsists !'
            })
        }

        await this.prisma.lessonModule.update({
            where: {
                id: payload.id
            },
            data: payload
        })

        return {
            success: true,
            message: 'lesson-Module success updated !'
        }
    }

    

    async delete(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide Id !'
            })
        }

        if(!await this.prisma.lessonModule.findUnique({where: {id: Number(id)}})) {
            throw new NotFoundException({
                success: false,
                message: 'lesson-Module not found !'
            })
        }

        await this.prisma.lessonModule.delete({where: {id: Number(id)}})
        return {
            success: true,
            message: 'lesson-Module success deleted !'
        }
    }
}
