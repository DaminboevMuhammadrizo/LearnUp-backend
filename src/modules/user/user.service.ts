import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { QueryMentorsDto } from './dto/query-mentors.dto';
import { AllQueryDto } from './dto/all-query.dto';
import { QueryByPhoneDto } from './dto/query-by-phone.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { CreateAssistantDto } from './dto/create-assistant';
import { UpdateAssistantDto } from './dto/update-assistant';
import { UpdateMentorDto } from './dto/update-mentor';
import { UserRole } from 'src/common/types/userRole';
import { hashPassword } from 'src/common/config/bcrypt/hash';


@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}


    async getAllMentors(query: QueryMentorsDto) {
        const where: any = { role: UserRole.MENTOR }
        const take = query.limit ?? 10
        const skip = query.offset ? (query.offset - 1) * take : 0

        if (query.search) {
            where.fullName = { contains: query.search.trim(), mode: 'insensitive', }
        }
        return this.prisma.users.findMany({ where, skip, take, include: { mentorProfile: true } })
    }


    async getSingleMentor(id: number) {
        return this.prisma.users.findFirst({ where: { id, role: UserRole.MENTOR }, include: { mentorProfile: true } })
    }


    async getAllUsers(query: AllQueryDto) {
        const where = {}
        const take = query.limit ?? 10
        const skip = query.offset ? (query.offset - 1) * take : 0

        query.role && (where['role'] = query.role)
        query.search && (where['fullName'] = query.search)
        return await this.prisma.users.findMany({ where, skip, take })
    }


    async getSingleUser(id: number) {
        return this.prisma.users.findUnique({ where: { id } })
    }


    async getByPhone(query: QueryByPhoneDto) {
        return this.prisma.users.findUnique({ where: { email: query.email } })
    }


    async createAdmin(payload: CreateAdminDto) {
        if (await this.prisma.users.findUnique({ where: { email: payload.email } })) {
            throw new ConflictException('Email alredy exsists !')
        }
        payload.password = await hashPassword(payload.password)
        await this.prisma.users.create({ data: { ...payload, role: UserRole.ADMIN } })

        return {
            success: true,
            message: 'Admin success crated !'
        }
    }


    async createMentor(payload: CreateMentorDto) {
        if (await this.prisma.users.findUnique({ where: { email: payload.email } })) {
            throw new ConflictException('Email alredy exsists !')
        }
        payload.password = await hashPassword(payload.password)
        const user = await this.prisma.users.create({
            data: {
                email: payload.email,
                fullName: payload.fullName,
                password: payload.password,
                role: UserRole.MENTOR,
                mentorProfile: {
                    create: {
                        about: payload.about,
                        job: payload.job,
                        experience: payload.experience,
                        telegram: payload.telegram,
                        facebook: payload.facebook,
                        instagram: payload.instagram,
                        linkedin: payload.linkedin,
                        github: payload.github
                    }
                }
            }
        })

        return { success: true, message: 'mentor success created !' }
    }


    async createAssistant(payload: CreateAssistantDto) {
        if (await this.prisma.users.findUnique({ where: { email: payload.email } })) {
            throw new ConflictException('Email alredy exsists !')
        }
        if(!await this.prisma.course.findUnique({ where: {id: payload.courseId}})) {
            throw new NotFoundException({
                success: false,
                message: 'course not found !'
            })
        }

        await this.prisma.users.create({
            data: {
                ...payload,
                role: UserRole.ASSISTANT,
                asignedCourse: {
                    create: {
                        courseId: payload.courseId
                    }
                }
            }
        })
        return { success: true, message: 'assisstant success created !' }
    }


    async updateMentor(payload: UpdateMentorDto, id: number) {
        if (!await this.prisma.mentorProfile.findUnique({ where: { id } })) {
            throw new NotFoundException({ success: false, message: 'mentor not found !' })
        }
        if (payload.email && await this.prisma.users.findUnique({ where: { email: payload.email } })) {
            throw new ConflictException({ success: false, message: 'email alredy exsists ' })
        }

        await this.prisma.mentorProfile.update({ where: { id }, data: payload })
        return { success: true, message: 'mentor success updated !' }
    }


    async updateAssistant(payload: UpdateAssistantDto, id: number) {
        if (!await this.prisma.users.findUnique({ where: { id } })) {
            throw new NotFoundException({ success: false, message: 'user not found !' })
        }
        if (await this.prisma.users.findUnique({ where: { email: payload.email } })) {
            throw new ConflictException({ success: false, message: 'Email alredy exsists !' })
        }
        return { success: true, message: 'assistant success updated !' }
    }


    async delete(id: number) {
        if (!await this.prisma.users.findUnique({ where: { id } })) {
            throw new NotFoundException({message: 'user not found !'})
        }

        await this.prisma.users.delete({ where: { id } })
        return { success: true, message: 'user success deleted !' }
    }
}
