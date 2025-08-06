import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('cart')
export class CartController {
  private readonly logger = new Logger(CartController.name);

  constructor(private readonly cartService: CartService) { }

  @Post('/addToCart')
  addToCart(@Body() body: { productId: number; quantity: number; },
    @Req() req: any
  ) {
    const user = req.user as any;
    const userId = user.id;
    // console.log('User from JWT:', user);
    return this.cartService.addToCart(userId, body.productId, body.quantity);
  }

  @Get('userCart/:userId')
  getCartItems(@Param('userId') userId: string) {
    // console.log("Controller called for user:", userId);
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
