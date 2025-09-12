import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('cookie')
export class cookie extends Product {

}
