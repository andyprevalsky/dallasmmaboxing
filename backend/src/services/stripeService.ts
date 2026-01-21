/**
 * Stripe Payment Service
 * Handles payment processing with Stripe
 * Currently using mock implementation for testing
 *
 * For production:
 * - Uncomment Stripe initialization
 * - Set STRIPE_SECRET_KEY in environment variables
 * - Implement real Stripe API calls
 */

// import Stripe from 'stripe';

export interface CreatePaymentIntentParams {
  amount: number;
  currency?: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
  client_secret: string;
  created: number;
  metadata: Record<string, string>;
}

export interface CreateCheckoutSessionParams {
  priceId?: string;
  amount: number;
  currency?: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export interface CheckoutSession {
  id: string;
  url: string;
  payment_intent?: string;
}

export interface StripeWebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
  };
}

class StripeService {
  // private stripe: Stripe;
  private readonly mockMode = true;

  constructor() {
    // TODO: Initialize Stripe in production
    // const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    // if (!stripeSecretKey && process.env.NODE_ENV === 'production') {
    //   throw new Error('STRIPE_SECRET_KEY is required in production');
    // }
    // this.stripe = new Stripe(stripeSecretKey || '', {
    //   apiVersion: '2023-10-16',
    // });

    if (this.mockMode) {
      console.log('🔵 [STRIPE SERVICE]: Running in mock mode');
    }
  }

  /**
   * Create a Payment Intent
   * Used for one-time payments
   */
  async createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntent> {
    if (this.mockMode) {
      console.log('🔵 [MOCKED STRIPE]: Creating payment intent');
      console.log(`   Amount: $${(params.amount / 100).toFixed(2)}`);
      console.log(`   Description: ${params.description}`);

      // Mock payment intent
      const mockPaymentIntent: PaymentIntent = {
        id: `pi_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount: params.amount,
        currency: params.currency || 'usd',
        status: 'succeeded',
        client_secret: `pi_mock_secret_${Date.now()}`,
        created: Math.floor(Date.now() / 1000),
        metadata: params.metadata || {},
      };

      console.log(`   ✅ Created mock payment intent: ${mockPaymentIntent.id}`);
      return mockPaymentIntent;
    }

    // TODO: Uncomment for production
    // const paymentIntent = await this.stripe.paymentIntents.create({
    //   amount: params.amount,
    //   currency: params.currency || 'usd',
    //   description: params.description,
    //   metadata: params.metadata,
    //   automatic_payment_methods: {
    //     enabled: true,
    //   },
    // });
    //
    // return {
    //   id: paymentIntent.id,
    //   amount: paymentIntent.amount,
    //   currency: paymentIntent.currency,
    //   status: paymentIntent.status as any,
    //   client_secret: paymentIntent.client_secret || '',
    //   created: paymentIntent.created,
    //   metadata: paymentIntent.metadata as Record<string, string>,
    // };

    throw new Error('Production Stripe not configured');
  }

  /**
   * Create a Checkout Session
   * Redirects user to Stripe-hosted checkout page
   */
  async createCheckoutSession(params: CreateCheckoutSessionParams): Promise<CheckoutSession> {
    if (this.mockMode) {
      console.log('🔵 [MOCKED STRIPE]: Creating checkout session');
      console.log(`   Amount: $${(params.amount / 100).toFixed(2)}`);
      console.log(`   Success URL: ${params.successUrl}`);
      console.log(`   Cancel URL: ${params.cancelUrl}`);

      // Mock checkout session
      const sessionId = `cs_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const mockSession: CheckoutSession = {
        id: sessionId,
        url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/mock-checkout/${sessionId}`,
        payment_intent: `pi_mock_${Date.now()}`,
      };

      console.log(`   ✅ Created mock checkout session: ${mockSession.id}`);
      return mockSession;
    }

    // TODO: Uncomment for production
    // const session = await this.stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: params.priceId ? [
    //     {
    //       price: params.priceId,
    //       quantity: 1,
    //     },
    //   ] : [
    //     {
    //       price_data: {
    //         currency: params.currency || 'usd',
    //         product_data: {
    //           name: 'Dallas MMA Boxing Class',
    //         },
    //         unit_amount: params.amount,
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: 'payment',
    //   success_url: params.successUrl,
    //   cancel_url: params.cancelUrl,
    //   customer_email: params.customerEmail,
    //   metadata: params.metadata,
    // });
    //
    // return {
    //   id: session.id,
    //   url: session.url || '',
    //   payment_intent: session.payment_intent as string,
    // };

    throw new Error('Production Stripe not configured');
  }

  /**
   * Retrieve a Payment Intent
   */
  async retrievePaymentIntent(paymentIntentId: string): Promise<PaymentIntent | null> {
    if (this.mockMode) {
      console.log(`🔵 [MOCKED STRIPE]: Retrieving payment intent ${paymentIntentId}`);

      // Return a mock successful payment intent
      return {
        id: paymentIntentId,
        amount: 12000, // $120.00
        currency: 'usd',
        status: 'succeeded',
        client_secret: `${paymentIntentId}_secret`,
        created: Math.floor(Date.now() / 1000),
        metadata: {},
      };
    }

    // TODO: Uncomment for production
    // try {
    //   const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    //   return {
    //     id: paymentIntent.id,
    //     amount: paymentIntent.amount,
    //     currency: paymentIntent.currency,
    //     status: paymentIntent.status as any,
    //     client_secret: paymentIntent.client_secret || '',
    //     created: paymentIntent.created,
    //     metadata: paymentIntent.metadata as Record<string, string>,
    //   };
    // } catch (error) {
    //   console.error('Error retrieving payment intent:', error);
    //   return null;
    // }

    throw new Error('Production Stripe not configured');
  }

  /**
   * Create a refund
   */
  async createRefund(paymentIntentId: string, amount?: number): Promise<{ id: string; status: string }> {
    if (this.mockMode) {
      console.log(`🔵 [MOCKED STRIPE]: Creating refund for ${paymentIntentId}`);
      console.log(`   Amount: ${amount ? `$${(amount / 100).toFixed(2)}` : 'Full refund'}`);

      const refundId = `re_mock_${Date.now()}`;
      console.log(`   ✅ Created mock refund: ${refundId}`);

      return {
        id: refundId,
        status: 'succeeded',
      };
    }

    // TODO: Uncomment for production
    // const refund = await this.stripe.refunds.create({
    //   payment_intent: paymentIntentId,
    //   amount,
    // });
    //
    // return {
    //   id: refund.id,
    //   status: refund.status,
    // };

    throw new Error('Production Stripe not configured');
  }

  /**
   * Verify Stripe webhook signature
   * Important for security - ensures webhook came from Stripe
   */
  verifyWebhookSignature(payload: string | Buffer, _signature: string): StripeWebhookEvent {
    if (this.mockMode) {
      console.log('🔵 [MOCKED STRIPE]: Verifying webhook signature (skipped in mock mode)');

      // In mock mode, just parse the payload
      const event = typeof payload === 'string' ? JSON.parse(payload) : JSON.parse(payload.toString());
      return event;
    }

    // TODO: Uncomment for production
    // const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    // if (!webhookSecret) {
    //   throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
    // }
    //
    // try {
    //   const event = this.stripe.webhooks.constructEvent(
    //     payload,
    //     signature,
    //     webhookSecret
    //   );
    //   return event as StripeWebhookEvent;
    // } catch (error) {
    //   console.error('Webhook signature verification failed:', error);
    //   throw new Error('Invalid webhook signature');
    // }

    throw new Error('Production Stripe not configured');
  }
}

// Export singleton instance
export const stripeService = new StripeService();
