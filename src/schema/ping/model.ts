import BaseModel from '../baseModel';
import { Ping as PingEntity } from '../../database/entity/Ping';
import { Raw, Not } from 'typeorm';

export default class PingModel extends BaseModel {
    constructor(connection: any, context?: any) {
        super(connection, connection.getRepository(PingEntity), context);
    }

    test() {
        return 'test ping model'
    }
}
