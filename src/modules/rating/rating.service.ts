import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateRatingDto } from './dto/create.dto';
import { UpdateRatingDto } from './dto/update.dto';

@Injectable()
export class RatingService {
    constructor(private readonly prisma: PrismaService) {}


    async getAll() {
        return this.prisma.rating.findMany()
    }


    async getRatingForCourse(courseId: number) {
        return this.prisma.rating.findMany({ where: { courseId } })
    }


    async getRatingForAnalystics(courseId: number) {
        const ratings = await this.prisma.rating.findMany({
            where: { courseId },
        })

        const result = {
            one: 0,
            two: 0,
            three: 0,
            four: 0,
            five: 0,
            rate: 0,
        };

        ratings.forEach(r => {
            if (r.rate === 1) result.one++
            if (r.rate === 2) result.two++
            if (r.rate === 3) result.three++
            if (r.rate === 4) result.four++
            if (r.rate === 5) result.five++
        })

        const total = ratings.length
        const sum = ratings.reduce((acc, r) => acc + r.rate, 0)
        result.rate = total ? parseFloat((sum / total).toFixed(1)) : 0

        return result
    }


    async create (payload: CreateRatingDto, usersId: number) {
        if(!await this.prisma.course.findUnique({where: {id: payload.courseId}})) {
            throw new NotFoundException({success: false, message: 'course not found !'})
        }

        await this.prisma.rating.create({data: {...payload, usersId}})
        return {success: true, message: 'rating success created !'}
    }


    async update (payload: UpdateRatingDto) {
        if(!await this.prisma.rating.findUnique({where: {id: payload.id}})) {
            throw new NotFoundException({success: false, message: 'rating not found !'})
        }

        await this.prisma.rating.update({where: {id: payload.id}, data: payload})
        return {success: true, message: 'rating success updated !'}
    }


    async delete (id: number) {
        if(!await this.prisma.rating.findUnique({where: {id}})) {
            throw new NotFoundException({success: false, message: 'rating not found !'})
        }

        await this.prisma.rating.delete({where: {id}})
        return {success: true, message: 'rating success deleted !'}
    }
}
