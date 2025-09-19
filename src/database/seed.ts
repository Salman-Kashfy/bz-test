import 'reflect-metadata';
import connection from './connection';
import {hash} from "bcrypt";
import { Role } from './entity/Role';
import { User } from './entity/User';
import { UserRole } from './entity/UserRole';

const COUNTRY_ID = 167
const STATE_ID = 3008
const CITY_ID = 83559

import { roles } from './objects/roles';
import { users } from './objects/users';
import { userRoles } from './objects/userRoles';

export const startSeeding = async () => {

    await connection.initialize();
    const passwordHash = await hash('qwerty', 10);

    console.log('Adding Roles');
    const _roles = roles();
    await connection.createQueryBuilder().insert().into(Role).values(Object.values(_roles)).execute();

    console.log('Adding Users');
    const _users = await users({passwordHash, countryId:COUNTRY_ID});
    await connection.createQueryBuilder().insert().into(User).values(Object.values(_users)).execute();

    console.log('Adding User Roles');
    const _userRoles = await userRoles();
    await connection.createQueryBuilder().insert().into(UserRole).values(Object.values(_userRoles)).execute();

}

startSeeding();