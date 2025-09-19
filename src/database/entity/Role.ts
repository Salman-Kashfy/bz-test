import { Entity, PrimaryColumn, Column, BaseEntity, OneToMany, Index } from 'typeorm';
import { Length } from 'class-validator';
import { RolePermission } from './RolePermission';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
    @PrimaryColumn()
    id!: number;

    @Column('uuid', { unique: true, default: () => 'uuid_generate_v4()' })
    uuid!: string;

    @Column({ name: 'name' })
    @Length(1, 20)
    @Index()
    name!: string;

    @Column()
    status!: string;

    /**
     * Relations
     */
    @OneToMany((type) => RolePermission, (rolesPermissions) => rolesPermissions.role)
    rolesPermissions!: RolePermission[];
}
