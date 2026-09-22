import PingModel from './ping/model';

export default class Context {
    static instance: Context;
    ping: PingModel;

    constructor(connection: any, req?: any) {
        this.ping = new PingModel(connection);
    }

    static getInstance(connection: any, req?: any) {
        if (!this.instance) {
            this.instance = new Context(connection, req);
        }
        return this.instance;
    }

    static setupCtx(connection: any) {
        return this.getInstance(connection);
    }
}