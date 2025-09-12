import { ChildEntity, Column } from 'typeorm';
import { Product } from './product.entity';

@ChildEntity('mousse')
export class mousse extends Product {

}
