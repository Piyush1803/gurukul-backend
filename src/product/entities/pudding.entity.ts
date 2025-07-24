import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('pudding')
export class Pudding extends Product {
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
}