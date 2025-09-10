
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity('products')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('longblob', { nullable: true })
    image: Buffer;
}
