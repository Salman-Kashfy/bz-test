import PingModel from './ping/model';
import RedisClient from '../database/redis';

export default class Context {
    static instance: Context;
    ping: PingModel;
    redis: RedisClient;

    constructor(connection: any) {
        this.ping = new PingModel(connection);
        this.redis = RedisClient;
    }

    static getInstance(connection: any) {
        if (!this.instance) {
            this.instance = new Context(connection);
        }
        return this.instance;
    }

    static setupCtx(connection: any) {
        return this.getInstance(connection);
    }
}