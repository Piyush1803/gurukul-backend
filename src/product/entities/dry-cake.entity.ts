import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('dry-cake')
export class DryCake extends Product {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    flavor: string;

    @Column()
    shelfLife: number; // in days

    @Column()
    packaging: string; // box, wrapper, etc.

    @Column()
    weight: number; // in grams
}