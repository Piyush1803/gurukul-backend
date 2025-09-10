import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('cup-cake')
export class CupCake extends Product {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    flavor: string;

    @Column()
    frostingType: string;

    @Column()
    hasToppings: boolean;

    @Column()
    size: string; // mini, regular, jumbo
}