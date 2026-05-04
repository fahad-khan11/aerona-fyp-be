import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
export declare class StripeService {
    private configService;
    private stripe;
    constructor(configService: ConfigService);
    private getClient;
    createCheckoutSession(data: {
        amount: number;
        currency: string;
        successUrl: string;
        cancelUrl: string;
        customerEmail?: string;
        metadata?: Record<string, string>;
    }): Promise<Stripe.Response<Stripe.Checkout.Session>>;
}
