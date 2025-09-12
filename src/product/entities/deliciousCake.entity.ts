import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('deliciousCake')
export class deliciousCake extends Product {

    @Column()
    wieght: number;

}
