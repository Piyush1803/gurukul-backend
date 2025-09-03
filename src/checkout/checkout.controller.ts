import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { AuthGuard } from '@nestjs/passport';
import { CheckoutDto } from './dto/checkout.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('checkout')
export class CheckoutController {
    constructor(private readonly checkoutService: CheckoutService) { }

    @Post()
    async checkout(@Req() req: any, @Body() body: CheckoutDto) {
        const user = req.user as any;
        const userId = user.sub ?? user.userId ?? user.id;
        return this.checkoutService.processCheckout(userId, body);
    }
}


