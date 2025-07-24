import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('cake')
export class Cake extends Product {
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

    // Cake-specific fields
    @Column({ nullable: true })
    layers: number;
}
