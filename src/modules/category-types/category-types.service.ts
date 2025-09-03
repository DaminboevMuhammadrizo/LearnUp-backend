import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { GetAllCategoryTypesQueryDto } from './dto/getall.dto';
import { CreateCategoryTypeDto } from './dto/create.dto';
import { UpdateCategoryTypeDto } from './dto/update.dto';

@Injectable()
export class CategoryTypesService {
    constructor(private readonly prisma: PrismaService) { }

    async getAll(query: GetAllCategoryTypesQueryDto) {

        const take = query.limit ?? 10;
        const skip = query.offset ? (query.offset - 1) * take : 0;
        const where: any = {};

        query.name && (where.name = query.name)

        const data = await this.prisma.categoryTypes.findMany({ where })

        if (data.length === 0) {
            throw new NotFoundException({ success: false, message: 'Category-Types Not Found !' })
        }

        return {
            success: true,
            message: 'success readed !',
            data
        }
    }


    async getOne(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({ success: false, message: 'Invalide ID !' })
        }

        const data = await this.prisma.categoryTypes.findUnique({ where: { id: Number(id) } })

        if (data) throw new NotFoundException({ success: false, message: 'Category-Types Not Found !' })

        return {
            success: true,
            message: 'success readed !',
            data
        }
    }


    async create(paylad: CreateCategoryTypeDto) {
        const ct = await this.prisma.categoryTypes.findUnique({ where: { name: paylad.name } })
        if (ct) throw new ConflictException({ success: false, message: 'Category-Types alredy exsists !' })

        await this.prisma.categoryTypes.create({ data: paylad })
        return { success: true, message: 'Category-Types success created !' }
    }


    async update(payload: UpdateCategoryTypeDto) {
        if (!await this.prisma.categoryTypes.findUnique({ where: { id: payload.id } })) {
            throw new NotFoundException({ success: false, message: 'Category-Type Not Found !' })
        }

        if (await this.prisma.categoryTypes.findUnique({ where: { name: payload.name } })) {
            throw new ConflictException({ success: false, message: 'Category-Types alredy exsists !' })
        }

        await this.prisma.categoryTypes.update({ where: { id: payload.id }, data: payload.name })
        return { success: true, message: 'Category-Types success updated !' }
    }


    async delete(id: string) {
        if(isNaN(Number(id))) {
            throw new BadRequestException({success: false, message: 'Invalide ID !'})
        }
        
        if (!await this.prisma.categoryTypes.findUnique({ where: { id: Number(id) } })) {
            throw new NotFoundException({ success: false, message: 'Category-Type Not Found !' })
        }

        await this.prisma.categoryTypes.delete({where: {id: Number(id)}})
        return {success: true, message: 'Category-Types success deleted !'}
    }
}
