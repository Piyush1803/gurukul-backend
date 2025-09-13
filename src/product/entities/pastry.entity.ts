import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('pastry')
export class Pastry extends Product {

}
