import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';

@Injectable()
export class HomeworkSubmissionService {
    constructor (private readonly prisma: PrismaService) {}
    
}
