import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateAssignedCourseDto } from './dto/create.dto';
import { UpdateAssignedCourseDto } from './dto/update.dto';

@Injectable()
export class AssignedCourseService {
    constructor (private readonly prisma: PrismaService) {}


    async getAll () {
        return this.prisma.assignedCourse.findMany()
    }


    async getOne (id: number) {
        return this.prisma.assignedCourse.findUnique({where: {id}})
    }


    async create (payload: CreateAssignedCourseDto) {
        if(!await this.prisma.users.findUnique({where: {id: payload.usersId}})) {
            throw new NotFoundException({success: false, message: 'user not found !'})
        }

        if(!await this.prisma.course.findUnique({where: {id: payload.courseId}})) {
            throw new NotFoundException({success: false, message: 'course not found !'})
        }

        await this.prisma.assignedCourse.create({data: payload})
        return {success: true, message: 'assigned-course success created !'}
    }


    async update (payload: UpdateAssignedCourseDto) {

        if(!payload.id || !await this.prisma.assignedCourse.findUnique({where: {id: payload.id}})) {
            throw new NotFoundException({success: false, message: 'assigned-course not found !'})
        }

        if(payload.usersId && !await this.prisma.users.findUnique({where: {id: payload.usersId}})) {
            throw new NotFoundException({success: false, message: 'user not found !'})
        }

        if(payload.courseId && !await this.prisma.course.findUnique({where: {id: payload.courseId}})) {
            throw new NotFoundException({success: false, message: 'course not found !'})
        }

        await this.prisma.assignedCourse.update({where: {id: payload.id}, data: payload})
        return {success: true, message: 'assigned-course success updated !'}
    }


    async delete (id: number) {
        
        if(!await this.prisma.assignedCourse.findUnique({where: {id}})) {
            throw new NotFoundException({success: false, message: 'assigned-cpurse not found !'})
        }

        await this.prisma.assignedCourse.delete({where: {id}})
        return {success: false, message: 'assigned-course success deleted !'}
    }
}
