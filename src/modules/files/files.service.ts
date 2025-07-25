import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';

@Injectable()
export class FilesService {
    constructor (private readonly prisma: PrismaService) {}

    async getPublicFile(name: string) {}

    
    async getPrivateLessonFile (lessonId: string, name: string) {}


    async getPrivateVideoFile(lessonId: string, hlsf: string) {}
}
