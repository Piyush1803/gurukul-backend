import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { Cart } from '../cart/entities/cart.entity';
import { User } from '../user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, User])],
    controllers: [CheckoutController],
    providers: [CheckoutService],
    exports: [CheckoutService],
})
export class CheckoutModule { }


