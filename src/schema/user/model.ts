import BaseModel from '../baseModel';
import {User as UserEntity} from '../../database/entity/User';

export default class User extends BaseModel {
    repository: any;
    connection: any;

    constructor(connection: any, context: any) {
        super(connection, connection.getRepository(UserEntity), context);
    }
}
