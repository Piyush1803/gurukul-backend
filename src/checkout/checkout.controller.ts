import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('checkout')
export class CheckoutController {
    constructor(private readonly checkoutService: CheckoutService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('initiate-payment')
    async initiatePayment(
        @Body() body: { deliveryAddress: string; phoneNo: string },
        @Req() req: any
    ) {
        try {
            const user = req.user as any;
            const userId = user.sub ?? user.userId ?? user.id;

            const result = await this.checkoutService.initiatePayment(
                userId,
                body.deliveryAddress,
                body.phoneNo
            );

            return {
                message: 'Payment initiated successfully',
                success: true,
                data: result.data
            };
        } catch (error) {
            return {
                message: 'Error initiating payment',
                error: error.message,
                success: false
            };
        }
    }

    @Post('payment-callback')
    async handlePaymentCallback(@Body() body: any) {
        try {
            const result = await this.checkoutService.handlePaymentCallback(body);

            return {
                message: result.message,
                success: result.success,
                data: result.data
            };
        } catch (error) {
            return {
                message: 'Error processing payment callback',
                error: error.message,
                success: false
            };
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('clear-cart')
    async clearCart(@Req() req: any) {
        try {
            const user = req.user as any;
            const userId = user.sub ?? user.userId ?? user.id;

            const result = await this.checkoutService.clearUserCart(userId);

            return {
                message: result.message,
                success: result.success
            };
        } catch (error) {
            return {
                message: 'Error clearing cart',
                error: error.message,
                success: false
            };
        }
    }
}