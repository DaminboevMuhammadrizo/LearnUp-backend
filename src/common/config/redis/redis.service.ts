import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';


@Injectable()
export class RedisService implements OnModuleInit{
    private client: Redis
    onModuleInit() {
        this.client = new Redis({host: 'fixoo_redis', port: 6379 })
    }

    async get (key: string) {
        return await this.client.get(key)
    }

    async set (key: string, code: string, second: number) {
        return await this.client.set(key, code, 'EX', second)
    }

    async del (key: string) {
        return await this.client.del(key)
    }
}