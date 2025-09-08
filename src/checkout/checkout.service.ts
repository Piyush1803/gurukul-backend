import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { User } from '../user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import * as crypto from 'crypto';

interface PendingPaymentContext {
    userId: string;
    phoneNo: string;
    deliveryAddress: string;
    itemsDescription: string;
    totalQuantity: number;
    subTotal: number;
    deliveryFee: number;
    finalAmount: number;
}

@Injectable()
export class CheckoutService {
    private readonly phonepeBaseUrl: string;
    private readonly merchantId: string;
    private readonly saltKey: string;
    private readonly saltIndex: number;

    // In-memory store for pending payments (replace with DB/Redis in production)
    private readonly pendingPayments = new Map<string, PendingPaymentContext>();

    constructor(
        @InjectRepository(Cart)
        private cartRepo: Repository<Cart>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {
        // PhonePe credentials from environment variables
        this.merchantId = process.env.PHONEPE_MERCHANT_ID || '';
        this.saltKey = process.env.PHONEPE_SALT_KEY || '';
        this.saltIndex = parseInt(process.env.PHONEPE_SALT_INDEX || '1');

        // Use sandbox URL for testing, production URL for live
        this.phonepeBaseUrl = process.env.NODE_ENV === 'production'
            ? 'https://api.phonepe.com/apis/hermes'
            : 'https://api-preprod.phonepe.com/apis/hermes';
    }

    async initiatePayment(userId: string, deliveryAddress: string, phoneNo: string) {
        try {
            const cartItems = await this.cartRepo.find({
                where: { user: { id: userId } },
                relations: ['product'],
            });

            if (!cartItems || cartItems.length === 0) {
                throw new BadRequestException('Cart is empty');
            }

            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new BadRequestException('User not found');
            }

            let totalAmount = 0;
            let itemsDescription = '';
            let totalQuantity = 0;

            cartItems.forEach((item, index) => {
                const itemTotal = item.quantity * item.product.price;
                totalAmount += itemTotal;
                totalQuantity += item.quantity;

                if (index > 0) itemsDescription += ', ';
                const productName = (item.product as any).name || `Product ${item.product.id}`;
                itemsDescription += `${productName} x${item.quantity}`;
            });

            const deliveryFee = 20;
            const finalAmount = totalAmount + deliveryFee;

            const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            const paymentRequest = {
                merchantId: this.merchantId,
                merchantTransactionId: transactionId,
                merchantUserId: userId,
                amount: finalAmount * 100,
                redirectUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment-success`,
                redirectMode: 'POST',
                callbackUrl: `${process.env.BACKEND_URL || 'http://localhost:3001'}/checkout/payment-callback`,
                mobileNumber: phoneNo,
                paymentInstrument: {
                    type: 'PAY_PAGE'
                }
            };

            const payload = Buffer.from(JSON.stringify(paymentRequest)).toString('base64');
            const checksum = this.generateChecksumForPay(payload);

            const response = await axios.post(`${this.phonepeBaseUrl}/pg/v1/pay`, {
                request: payload
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum,
                    'accept': 'application/json'
                }
            });

            if (response.data.success) {
                // Save pending context to verify later on callback
                this.pendingPayments.set(transactionId, {
                    userId,
                    phoneNo,
                    deliveryAddress,
                    itemsDescription,
                    totalQuantity,
                    subTotal: totalAmount,
                    deliveryFee,
                    finalAmount,
                });

                return {
                    success: true,
                    data: {
                        paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
                        transactionId,
                        amount: finalAmount,
                    }
                };
            } else {
                throw new Error('Failed to initiate payment');
            }
        } catch (error: any) {
            throw new Error(`Payment initiation failed: ${error.message}`);
        }
    }

    async handlePaymentCallback(callbackData: any) {
        try {
            // PhonePe sends base64 response in "response" field
            const { response } = callbackData || {};
            if (!response) {
                return { success: false, message: 'Invalid callback payload' };
            }

            const decodedResponse = Buffer.from(response, 'base64').toString('utf-8');
            const paymentResponse = JSON.parse(decodedResponse);
            const { merchantTransactionId } = paymentResponse.data || {};

            if (!merchantTransactionId) {
                return { success: false, message: 'Missing merchantTransactionId' };
            }

            // Verify status with PhonePe Status API before creating an order
            const status = await this.verifyPaymentStatus(merchantTransactionId);
            if (!(status.success && status.state === 'COMPLETED' && status.responseCode === 'PAYMENT_SUCCESS')) {
                return { success: false, message: 'Payment not successful' };
            }

            // Load pending context
            const ctx = this.pendingPayments.get(merchantTransactionId);
            if (!ctx) {
                return { success: false, message: 'No pending payment context found' };
            }

            // Create order in Google Sheets via Sheety
            await this.createOrderInSheety({
                name: 'Customer', // Optional: enrich via user profile
                items: ctx.itemsDescription,
                quantity: ctx.totalQuantity,
                subTotal: ctx.subTotal,
                phoneNo: ctx.phoneNo,
                address: ctx.deliveryAddress,
            });

            // Clear user's cart
            await this.clearUserCart(ctx.userId);

            // Cleanup
            this.pendingPayments.delete(merchantTransactionId);

            return {
                success: true,
                message: 'Payment successful and order created',
                data: { merchantTransactionId }
            };
        } catch (error: any) {
            return { success: false, message: `Payment callback processing failed: ${error.message}` };
        }
    }

    private async createOrderInSheety(order: { name: string; items: string; quantity: number; subTotal: number; phoneNo: string; address: string; }) {
        const submittedAt = new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(',', '');

        const sheetyUrl = 'https://api.sheety.co/f87695357a26c709f44cd4ecdaa2e07a/gurukulBakeryOrders/sheet1';
        await axios.post(sheetyUrl, { ...order, submittedAt });
    }

    private generateChecksumForPay(payloadBase64: string): string {
        const checksumString = `${payloadBase64}/pg/v1/pay${this.saltKey}`;
        const checksum = crypto.createHash('sha256').update(checksumString).digest('hex');
        return `${checksum}###${this.saltIndex}`;
    }

    private generateChecksumForStatus(path: string): string {
        // path like /pg/v1/status/{merchantId}/{merchantTransactionId}
        const checksumString = `${path}${this.saltKey}`;
        const checksum = crypto.createHash('sha256').update(checksumString).digest('hex');
        return `${checksum}###${this.saltIndex}`;
    }

    private async verifyPaymentStatus(merchantTransactionId: string): Promise<{ success: boolean; state?: string; responseCode?: string; }> {
        const path = `/pg/v1/status/${this.merchantId}/${merchantTransactionId}`;
        const url = `${this.phonepeBaseUrl}${path}`;
        const xVerify = this.generateChecksumForStatus(path);

        const res = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': xVerify,
                'X-MERCHANT-ID': this.merchantId,
                'accept': 'application/json',
            }
        });

        const data = res.data?.data || {};
        return {
            success: res.data?.success === true,
            state: data.state,
            responseCode: data.responseCode,
        };
    }

    async clearUserCart(userId: string) {
        try {
            await this.cartRepo.delete({ user: { id: userId } });
            return { success: true, message: 'Cart cleared successfully' };
        } catch (error: any) {
            throw new Error(`Failed to clear cart: ${error.message}`);
        }
    }
}