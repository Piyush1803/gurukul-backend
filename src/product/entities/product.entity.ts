import { Cart } from "src/cart/entities/cart.entity";
import { Column, Double, Entity, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity('products')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    type: string;

    @Column()
    price: number;

    @OneToMany(() => Cart, (cart) => cart.product)
    cartItems: Cart[];
}
