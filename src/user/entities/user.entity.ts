import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: false })
    firstName: string;

    @Column({ name: 'last_name', type: 'text', nullable: true })
    lastName: string;

    @Column({ name: 'user_name', type: 'varchar', length: 256, nullable: true })
    userName: string;

    @Column({ name: 'password', type: 'text', nullable: true })
    password: string;

    @Column({ name: 'role', type: 'varchar', length: 255, nullable: false, default: 'user' })
    role: string;

    @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
    email: string;

    @Column({ name: 'phone_number', type: 'varchar', length: 15, nullable: false, unique: true })
    phoneNumber: string;

    @Column({ name: 'address', type: 'varchar', length: 255, nullable: false })
    address: string;

}
