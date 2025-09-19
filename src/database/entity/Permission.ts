import {Entity, Column, BaseEntity, Index, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Length } from 'class-validator';
import { RolePermission } from './RolePermission';
import { Status } from "./root/enums";

@Entity({ name: 'permissions' })
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'name' })
    @Length(1, 250)
    @Index()
    name!: string;

    @Column({ default: Status.ACTIVE })
    status!: Status;

    @OneToMany((type) => RolePermission, (rolesPermissions) => rolesPermissions.permission)
    rolesPermissions!: RolePermission[];
}