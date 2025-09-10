import { Column, Double, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity('products')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    type: string;

    @Column()
    price: number;
}
