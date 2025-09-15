import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('dryCake')
export class dryCake extends Product {
    @Column()
    weight: number;
}
