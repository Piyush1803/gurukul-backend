import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('delicious-cake')
export class DeliciousCake extends Product {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    flavor: string;

    @Column()
    layers: number;

    @Column()
    size: string; // small, medium, large

    @Column()
    weight: number; // in grams
}