import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('otps')
export class Otp {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'phone_number', type: 'varchar', length: 15, nullable: false })
    phoneNumber: string;

    @Column({ name: 'otp_code', type: 'varchar', length: 6, nullable: false })
    otpCode: string;

    @Column({ name: 'is_verified', type: 'boolean', default: false })
    isVerified: boolean;

    @Column({ name: 'expires_at', type: 'timestamp', nullable: false })
    expiresAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}

