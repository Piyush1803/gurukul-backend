import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('mousse')
export class Mousse extends Product {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    flavor: string;

    @Column()
    servingSize: string; // individual, sharing

    @Column()
    hasLayers: boolean;

    @Column()
    temperature: string; // chilled, frozen
}