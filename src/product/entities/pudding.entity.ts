import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('pudding')
export class Pudding extends Product {

}
