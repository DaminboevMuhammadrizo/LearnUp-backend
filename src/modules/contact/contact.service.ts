import { Injectable } from '@nestjs/common';
import { ContactDto } from './dto/contact-dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ContactService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://muhammadrizo:123456@192.168.32.110:5672'],
                queue: 'contact',
                queueOptions: {
                    durable: false,
                },
            },
        });
    }

    async contact(payload: ContactDto) {
        const result$ = this.client.send('contact', payload);
        return lastValueFrom(result$);
    }
}
    