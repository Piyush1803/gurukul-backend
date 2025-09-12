import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('cupCake')
export class cupCake extends Product {
    @Column()
    pieces: number;
}