import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { firstValueFrom } from 'rxjs';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class CheckoutService {
    constructor(
        private readonly http: HttpService,
    ) { }

    async processCheckout(userId: string, dto: CheckoutDto) {
        const user: Partial<User> = { id: userId };

        const lineItems = dto.items.map((ci) => ({
            productId: ci.productId,
            name: ci.name,
            price: ci.price,
            quantity: ci.quantity,
            total: ci.price * ci.quantity,
        }));

        const subtotal = lineItems.reduce((sum, li) => sum + li.total, 0);

        const payload = {
            order: {
                userId,
                customerName: dto.customerName,
                customerEmail: dto.customerEmail,
                address: dto.address,
                phone: dto.phone,
                notes: dto.notes,
                subtotal,
                currency: dto.currency ?? 'INR',
                items: lineItems,
                createdAt: new Date().toISOString(),
            },
        };

        const sheetyUrl = process.env.SHEETY_URL;
        const sheetyToken = process.env.SHEETY_TOKEN; // optional bearer token

        if (!sheetyUrl) {
            throw new Error('SHEETY_URL not configured');
        }

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (sheetyToken) headers['Authorization'] = `Bearer ${sheetyToken}`;

        const response = await firstValueFrom(
            this.http.post<any>(sheetyUrl, payload, { headers })
        );

        return { message: 'Order placed', subtotal, items: lineItems, sheetyResponse: response.data };
    }
}


