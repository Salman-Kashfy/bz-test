import {ROLES} from "../../shared/config";

export const roles = () => [
    {
        id: ROLES.SUPER_ADMIN.ID,
        name: ROLES.SUPER_ADMIN.NAME,
        status: 'ACTIVE',
    },
    {
        id: ROLES.ADMIN.ID,
        name: ROLES.ADMIN.NAME,
        status: 'ACTIVE',
    },
    {
        id: ROLES.HR_ADMIN.ID,
        name: ROLES.HR_ADMIN.NAME,
        status: 'ACTIVE',
    },
    {
        id: ROLES.MANAGER.ID,
        name: ROLES.MANAGER.NAME,
        status: 'ACTIVE',
    },
    {
        id: ROLES.EMPLOYEE.ID,
        name: ROLES.EMPLOYEE.NAME,
        status: 'ACTIVE',
    }
]