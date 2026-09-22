import BaseModel from '../baseModel';
import axios from 'axios';
import { Ping as PingEntity } from '../../database/entity/Ping';
import { faker } from "@faker-js/faker";

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

    async send() {
        const payload = {
            title: faker.lorem.sentence(),
            author: faker.person.fullName(),
        }

        const startedAt = Date.now();
        const response = await axios.post('https://httpbin.org/anything', payload);
        const responseTime = Date.now() - startedAt;

        await this.repository.save({
            amznTraceId: response.data.headers['X-Amzn-Trace-Id'],
            responseTime,
            statusCode: response.status,
            payload
        });

        return {
            response: response.data,
            responseTime,
        };
    }
}
