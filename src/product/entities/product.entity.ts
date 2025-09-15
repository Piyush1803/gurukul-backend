import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity('products')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    price: number;

    @Column({ type: 'longblob', nullable: true })  // MySQL
    image: Buffer;

    @Column()
    description: string;

}
