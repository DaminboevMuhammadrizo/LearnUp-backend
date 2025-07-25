import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { GetMineDto } from './dto/get-mine.dto';
import { CreatePurchasedDto } from './dto/create-purchase.dto';
import { PaidVia } from '@prisma/client';
import { getPurchaseCourseByIdQueryDto } from './dto/get-pc-byid.dto';
import { CreatePurchaseCourseByPhone } from './dto/create-byphone.dto';

@Injectable()
export class PruchasedCourseService {
    constructor (private readonly prisma: PrismaService) {}


    async getMine (query: GetMineDto) {
        let where: any= {}

        const take = query.limit ?? 10
        const skip = query.offset ? (query.offset - 1) * take : 0

        query.courseId && (where.courseId = query.courseId)
        
        const data = await this.prisma.purchasedCourse.findMany({
            where,
            skip,
            take,
            include: {
                Course: true
            }
        })

        return {
            success: true,
            message: 'purchased-Course success readedd !',
            data
        }
    }


    async getPCforCourseId (courseId: string) {
        if(isNaN(Number(courseId))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide Id !'
            })
        }

        const data = await this.prisma.purchasedCourse.findMany({
            where: {
                courseId: Number(courseId)
            },
            include: {
                Course: true
            }
        })

        return {
            success: true,
            data
        }
    }


    async createPurchase (payload: CreatePurchasedDto, userId: number) {
        const course = await this.prisma.course.findUnique({
            where: {
                id: payload.courseId
            }
        })

        if(!course) {
            throw new NotFoundException({
                success: false,
                message: 'Course not found !'
            })
        }

        await this.prisma.purchasedCourse.create({
            data: {
                amount: course.price,
                paidVia: PaidVia.PAYME,
                courseId: payload.courseId,
                usersId: userId
            }
        })

        return {
            success: true,
            message: 'purchased-Curse success created !'
        }
    }


    async getPurchaseCourseById(id: string, query: getPurchaseCourseByIdQueryDto) {
        if(isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide Id !'
            })
        }

        const take = query.limit ?? 10
        const skip = query.offset ? (query.offset - 1) * take : 0

        const data = await this.prisma.purchasedCourse.findMany({
            where: {id: Number(id)},
            take,
            skip,
            include: {
                Course: true,
                Users: true
            }
        })

        return {
            success: true,
            message: 'success readedd !',
            data
        }
    }


    async createByPhone(payload: CreatePurchaseCourseByPhone) {
        const user = await this.prisma.users.findUnique({
            where: {
                phone: payload.phone
            }
        })
        if(!user) {
            throw new NotFoundException({
                success: true,
                message: 'user not found !'
            })
        }

        const course = await this.prisma.course.findUnique({
            where: {
                id: payload.courseId
            }
        })

        if(!course) {
            throw new NotFoundException({
                success: false,
                message: 'course not found !'
            })
        }


        await this.prisma.purchasedCourse.create({
            data: {
                amount: course.price,
                paidVia: PaidVia.CASH,
                usersId: user.id,
                courseId: payload.courseId
            }
        })

        return {
            success: true,
            message: 'purchased-course succsess created !'
        }
    }
}
