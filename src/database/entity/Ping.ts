import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index } from 'typeorm';

@Entity({ name: 'pings' })
export class Ping extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'name', unique: true })
    @Index()
    name!: string;

    @Column({ default: 'ACTIVE' })
    status!: string;
}
