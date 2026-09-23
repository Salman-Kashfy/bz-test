import BaseModel from '../baseModel';
import axios from 'axios';
import { Ping as PingEntity } from '../../database/entity/Ping';
import { faker } from "@faker-js/faker";
import RedisClient from '../../database/redis';

export default class PingModel extends BaseModel {
    constructor(connection: any, context?: any) {
        super(connection, connection.getRepository(PingEntity), context);
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
        try {
            response = await axios.post('https://httpbin.org/anything', payload);
        } catch (error) {
            throw error;
        }
        
        const responseTime = Date.now() - startedAt;
        
        const {mean, stddev} = await this.calcStdDev();
        const zScore = stddev > 0 ? (responseTime - mean) / stddev : 0;
        const isAnomaly = Math.abs(zScore) > 0.5; // or your chosen threshold
        console.log({mean, stddev, zScore, isAnomaly})

        const ping = await this.repository.save({
            amznTraceId: response.data.headers['X-Amzn-Trace-Id'],
            responseTime,
            statusCode: response.status,
            zScore, isAnomaly,
            payload
        });
        
        await RedisClient.publish('ping.created', JSON.stringify(ping));

        return {
            response: response.data,
            responseTime,
        };
    }

    /* 
        Calculate Rolling Stats(Mean and sample standard deviation)
    */
    async calcStdDev(){
        const [statistics] = await this.repository.query(`
            SELECT AVG(response_time) AS mean, STDDEV_SAMP(response_time) AS stddev
            FROM pings
            WHERE created_at >= NOW() - INTERVAL '1 hour';
        `);

        //console.log(statistics);

        return statistics;
    }
}
