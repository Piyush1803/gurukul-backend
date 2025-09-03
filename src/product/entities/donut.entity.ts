import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('donut')
export class Donut extends Product {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    flavor: string;

    @Column()
    quantity: number;

    @Column()
    imageUrl: string;

    // Donut-specific fields
    @Column({ nullable: true })
    filling: string;
}
