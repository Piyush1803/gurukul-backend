import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('brownie')
export class brownie extends Product {

}
