import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ContactDto } from './dto/contact-dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from 'src/Database/prisma.service';
import { GetAllContactDto } from './dto/get-all-contact.dto';

@Injectable()
export class ContactService {
    private client: ClientProxy;

    // constructor() {
    //     this.client = ClientProxyFactory.create({
    //         transport: Transport.RMQ,
    //         options: {
    //             urls: ['amqp://muhammadrizo:123456@192.168.32.110:5672'],
    //             queue: 'contact',
    //             queueOptions: {
    //                 durable: false,
    //             },
    //         },
    //     });
    // }

    // async contact(payload: ContactDto) {
    //     const result$ = this.client.send('contact', payload);
    //     return lastValueFrom(result$);
    // }


    constructor(private readonly prisma: PrismaService) { }


    async getAll(query: GetAllContactDto) {

        const take = query.limit ?? 10;
        const skip = query.offset ? (query.offset - 1) * take : 0;
        const where: any = {}

        if (query.email) {
            where.email = query.email
        }

        if (query.telegram) {
            where.telegram = query.telegram
        }

        if (query.word) {
            where.message = {
                contains: query.word,
                mode: 'insensitive', // optional: katta-kichik harf farqlanmaydi
            }
        }

        const data = await this.prisma.contact.findMany({
            where,
            skip,
            take
        })

        if (data.length === 0) {
            throw new NotFoundException({ success: false, message: 'Contact not found !' })
        }

        return data
    }



    async getOne(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                success: false,
                message: 'Invalide Id !'
            })
        }

        const data = await this.prisma.contact.findFirst({ where: { id: Number(id) } })
        if (data) {
            throw new NotFoundException({ success: false, message: 'Contact not found !' })
        }

        return data
    }

    
    async contact(payload: ContactDto) {
        await this.prisma.contact.create({ data: payload })
        return {
            success: true,
            message: 'Message sent successfully !'
        }
    }
}
