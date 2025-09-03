import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(User)
    private userRepo: Repository<User>
  ) { }

  async addToCart(userId: string, productId: number, quantity: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const product = await this.productRepo.findOne({ where: { id: productId } });

    if (!user || !product) throw new NotFoundException('User or Product not found');

    let cartItem = await this.cartRepo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
      relations: ['user', 'product'],
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartRepo.create({ user, product, quantity });
    }
    return this.cartRepo.save(cartItem);
  }

  async getUserCart(userId: string) {
    return this.cartRepo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async updateQuantity(cartId: number, quantity: number) {
    const cartItem = await this.cartRepo.findOne({ where: { id: cartId } });
    if (!cartItem) throw new NotFoundException('Cart item not found');

    cartItem.quantity = quantity;
    return this.cartRepo.save(cartItem);
  }

  async removeFromCart(cartId: number) {
    return this.cartRepo.delete({ id: cartId });
  }

  async clearCart(userId: string) {
    const cartItems = await this.cartRepo.find({
      where: { user: { id: userId } },
    });

    return this.cartRepo.remove(cartItems);
  }
}
