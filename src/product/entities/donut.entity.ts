import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('donut')
export class Donut extends Product {

}
