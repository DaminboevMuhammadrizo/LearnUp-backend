import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { CreateCourseCateforyDto } from './dto/create.dto';
import { UpdateCourseCateforyDto } from './dto/update.dto';

@Injectable()
export class CourseCategoryService {
    constructor (private readonly prisma: PrismaService) {}


    async getAll (query: GetAllQueryDto) {
        const take = query.limit ?? 10
        const skip = query.offset ? (query.offset - 1) * take : 0

        return this.prisma.courseCategory.findMany({take, skip})
    }

 
    async getOne (id: number) {
        return this.prisma.courseCategory.findUnique({where: {id}})
    }


    async create (payload: CreateCourseCateforyDto) {
        if(await this.prisma.courseCategory.findUnique({where: {name: payload.name}})) {
            throw new ConflictException({success: false, message: 'category alredy exsists !'})
        }

        await this.prisma.courseCategory.create({data: payload})
        return {success: true, message: 'course-category success created !'}
    }
 

    async update (payload: UpdateCourseCateforyDto) { 
        if(!await this.prisma.courseCategory.findUnique({where: {id: payload.id}})) {
            throw new NotFoundException({success: false, message: 'course-categody not found !'})
        }
        if(await this.prisma.courseCategory.findUnique({where: {name: payload.name}})) {
            throw new ConflictException({success: false, message: 'category alredy exsists !'})
        }

        await this.prisma.courseCategory.update({where: {id: payload.id}, data: payload})
        return {success: true, message: 'course-category success updated !'}
    }


    async delete (id: number) {
        if(!await this.prisma.courseCategory.findUnique({where: {id}})) {
            throw new NotFoundException({success: false, message: 'course-categody not found !'})
        }
        
        await this.prisma.courseCategory.delete({where: {id: id}})
        return {success: true, message: 'course-category success updated !'}
    }
}
