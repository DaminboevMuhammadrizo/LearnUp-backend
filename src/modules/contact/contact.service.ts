import { Injectable } from '@nestjs/common';
import { ContactDto } from './dto/contact-dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class ContactService {
    private client: ClientProxy
    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://muhammadrizo:123456@192.168.32.110:5672'],
                queue: 'user',
                queueOptions: {
                    durable: false
                }
            }
        })
    }


    async contact(payload: ContactDto) {
        return this.client.send('contact', payload)
    }
}
