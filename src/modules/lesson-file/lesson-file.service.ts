import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { CreateLessonFileDto } from './dto/lesson-file.create.dto';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';

@Injectable()
export class LessonFileService {
    constructor(private readonly prisma: PrismaService) { }

    async getByLessonId(lessonId: string) {
        if (isNaN(Number(lessonId))) {
            throw new BadRequestException({
                success: false,
                messgae: 'Invalide ID'
            })
        }
        const files = await this.prisma.lessonFile.findMany({
            where: { lessonId: Number(lessonId) },
            orderBy: { createdAt: 'desc' },
        });

        if (!files.length) {
            throw new NotFoundException({
                success: false,
                message: 'No files found for this lesson',
            });
        }

        return {
            success: true,
            data: files,
        };
    }

    async uploadLessonFiles(payload: CreateLessonFileDto, files: Express.Multer.File[]) {
        if (!files?.length) {
            throw new BadRequestException({
                success: false,
                mmessgae: 'No files uploaded !'
            });
        }

        const notes = payload.notes ?? [];

        const fileEntries = files.map((file, idx) => ({
            file: file.filename,
            note: notes[idx] ?? null,
            lessonId: payload.lessonId,
        }));

        const createdFiles = await this.prisma.lessonFile.createMany({
            data: fileEntries,
        });

        return {
            success: true,
            message: 'Files uploaded successfully',
            count: createdFiles.count,
        };
    }


    async delete(id: string) {
        if(isNaN(Number(id))) {
            throw new BadRequestException({
                success:false,
                message: 'Invalide Id'
            })
        }
        const lessonFile = await this.prisma.lessonFile.findUnique({
            where: { id: Number(id) },
        });

        if (!lessonFile) {
            throw new NotFoundException({
                success: false,
                message: 'Lesson file not found',
            });
        }
        
        const filePath = join(process.cwd(), 'uploads', 'lessons', lessonFile.file);

        if (existsSync(filePath)) {
            unlinkSync(filePath);
        }

        await this.prisma.lessonFile.delete({
            where: { id: Number(id) },
        });

        return {
            success: true,
            message: 'Lesson file success deleted !',
        };
    }

}
