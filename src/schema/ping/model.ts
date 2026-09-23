import BaseModel from '../baseModel';
import axios from 'axios';
import { Ping as PingEntity } from '../../database/entity/Ping';
import { faker } from "@faker-js/faker";
import RedisClient from '../../database/redis';

export default class PingModel extends BaseModel {
    constructor(connection: any, context?: any) {
        super(connection, connection.getRepository(PingEntity), context);
    }

    test() {
        return 'test ping model'
    }

    async getAll(page = 1, limit = 10) {
        const [data, total] = await this.repository.findAndCount({
            order: {
                createdAt: 'DESC',
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getLatest() {
        const [latest] = await this.repository.find({
            order: {
                createdAt: 'DESC',
            },
            take: 1,
        });

        return latest;
    }

    async send() {
        const payload = {
            title: faker.lorem.sentence(),
            author: faker.person.fullName(),
        }

        const startedAt = Date.now();
        let response;
        try{
            response = await axios.post('https://httpbin.org/anything', payload);
        }catch(error){
            if (axios.isAxiosError(error)) {
                response = error.response;
            }
        }
        
        const responseTime = Date.now() - startedAt;

        const ping = await this.repository.save({
            amznTraceId: response?.data?.headers?.['X-Amzn-Trace-Id'] ?? null,
            responseTime,
            statusCode: response?.status,
            payload
        });
        await RedisClient.publish('ping.created', JSON.stringify(ping));

        return {
            response: response?.data ?? {},
            responseTime,
        };
    }
}
