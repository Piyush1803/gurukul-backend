import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('cookie')
export class Cookie extends Product {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    flavor: string;

    @Column()
    texture: string; // crispy, chewy, soft

    @Column()
    hasChocolateChips: boolean;

    @Column()
    diameter: number; // in cm
}