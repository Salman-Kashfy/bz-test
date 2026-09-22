import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pings' })
export class Ping extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'integer', name: 'status_code' })
    statusCode!: number;

    @Column({ type: 'integer', name: 'response_time' })
    responseTime!: number;

    @Column({ type: 'integer', nullable: true, name: 'z_score' })
    zScore!: number;

    @Column({ type: 'boolean', nullable: true, name: 'is_anomaly' })
    isAnomaly!: boolean;

    @Column({ type: 'text', nullable: true, name: 'amzn_trace_id' })
    amznTraceId!: string;

    @Column({ type: 'jsonb', nullable: true })
    payload!: Record<string, unknown>;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(6)',
        name: 'created_at',
    })
    createdAt!: Date;
}
