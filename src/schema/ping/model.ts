import BaseModel from '../baseModel';
import { Ping as PingEntity } from '../../database/entity/Ping';
import { Raw, Not } from 'typeorm';

export default class PingModel extends BaseModel {
    constructor(connection: any, context?: any) {
        super(connection, connection.getRepository(PingEntity), context);
    }

    async index() {
        const list = await this.repository.find({
            where: { status: 'ACTIVE' },
        });
        return { list };
    }

    getByName(name: string) {
        return this.repository.findOne({
            where: { name: Raw((alias: string) => `LOWER(${alias}) = '${name.toLowerCase()}'`) },
        });
    }

    async create(input: any) {
        const ping = this.repository.create(input);
        return this.repository.save(ping);
    }

    async update(id: string, input: any) {
        await this.repository.update(id, input);
        return this.repository.findOne({ where: { id } });
    }

    async remove(id: string) {
        const ping = await this.repository.findOne({ where: { id } });
        if (!ping) return null;
        await this.repository.remove(ping);
        return true;
    }
}
