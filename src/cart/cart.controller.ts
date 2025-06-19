import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  private readonly logger = new Logger(CartController.name);

  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Body() body: { userId: string; productId: number; quantity: number; },
  ) {
    return this.cartService.addToCart(body.userId, body.productId, body.quantity);
  }

  @Get(':userId')
  getCartItems(@Param('userId') userId: string) {
    return this.cartService.getUserCart(userId);
  }
  
  @Patch(':cartId')
  updateQuantity(
    @Param('cartId') cartId: number,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.updateQuantity(cartId, quantity);
  }

  @Delete(':cartId')
  removeItem(@Param('cartId') cartId: number) {
    return this.cartService.removeFromCart(cartId);
  }

  @Delete('/clear/:userId')
  clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }

}
