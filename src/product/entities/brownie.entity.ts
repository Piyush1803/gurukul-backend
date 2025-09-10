import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('brownie')
export class Brownie extends Product {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    flavor: string;

    @Column()
    texture: string; // fudgy, chewy, cakey

    @Column()
    hasNuts: boolean;

    @Column()
    size: string; // small, medium, large
}