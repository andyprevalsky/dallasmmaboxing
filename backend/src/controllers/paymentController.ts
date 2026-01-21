import { Request, Response } from 'express';
import { PaymentModel } from '../models/Payment';
import { ClientModel } from '../models/Client';
import { ReleaseFormModel } from '../models/ReleaseForm';
import { ClassModel } from '../models/Class';
import { notificationService } from '../services/notificationService';
import { stripeService } from '../services/stripeService';
import { pdfService } from '../services/pdfService';

export const getAllPayments = async (_req: Request, res: Response): Promise<void> => {
  try {
    const payments = await PaymentModel.findAll();
    res.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payments',
    });
  }
};

export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const payment = await PaymentModel.findById(id);

    if (!payment) {
      res.status(404).json({
        success: false,
        error: 'Payment not found',
      });
      return;
    }

    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment',
    });
  }
};

export const getPaymentsByClientId = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientId = parseInt(req.params.clientId);
    const payments = await PaymentModel.findByClientId(clientId);

    res.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error('Error fetching client payments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch client payments',
    });
  }
};

export const createPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { client_id, amount, status, stripe_id, description } = req.body;

    if (!client_id || !amount || !status) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: client_id, amount, status',
      });
      return;
    }

    const newPayment = await PaymentModel.create({
      client_id,
      amount,
      status,
      stripe_id,
      description,
    });

    // Send notifications if payment is completed
    if (status === 'completed') {
      try {
        // Get client information
        const client = await ClientModel.findById(client_id);

        if (client) {
          // Get release form if available
          const releaseForm = await ReleaseFormModel.findByClientId(client_id);

          // Build confirmation URL (adjust domain as needed)
          const confirmationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/confirmation/${newPayment.id}`;

          // Send notifications
          await notificationService.sendPaymentConfirmationNotifications({
            clientName: client.name,
            clientEmail: client.email,
            clientPhone: client.phone,
            confirmationUrl,
            releaseFormUrl: releaseForm?.signed_pdf_url,
            paymentAmount: amount,
            paymentId: newPayment.id,
          });

          console.log(`✅ Notifications sent for payment #${newPayment.id}`);
        } else {
          console.warn(`⚠️  Client not found for payment #${newPayment.id}`);
        }
      } catch (notificationError) {
        // Log the error but don't fail the payment creation
        console.error('Error sending notifications:', notificationError);
        // Continue - payment was created successfully
      }
    }

    res.status(201).json({
      success: true,
      data: newPayment,
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create payment',
    });
  }
};

export const updatePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const updateData = req.body;

    // Get the old payment to check if status changed
    const oldPayment = await PaymentModel.findById(id);

    const updatedPayment = await PaymentModel.update(id, updateData);

    if (!updatedPayment) {
      res.status(404).json({
        success: false,
        error: 'Payment not found',
      });
      return;
    }

    // Send notifications if status changed to completed
    if (oldPayment && oldPayment.status !== 'completed' && updatedPayment.status === 'completed') {
      try {
        // Get client information
        const client = await ClientModel.findById(updatedPayment.client_id);

        if (client) {
          // Get release form if available
          const releaseForm = await ReleaseFormModel.findByClientId(updatedPayment.client_id);

          // Build confirmation URL
          const confirmationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/confirmation/${updatedPayment.id}`;

          // Send notifications
          await notificationService.sendPaymentConfirmationNotifications({
            clientName: client.name,
            clientEmail: client.email,
            clientPhone: client.phone,
            confirmationUrl,
            releaseFormUrl: releaseForm?.signed_pdf_url,
            paymentAmount: updatedPayment.amount,
            paymentId: updatedPayment.id,
          });

          console.log(`✅ Notifications sent for payment #${updatedPayment.id} (status update)`);
        }
      } catch (notificationError) {
        console.error('Error sending notifications:', notificationError);
      }
    }

    res.json({
      success: true,
      data: updatedPayment,
    });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update payment',
    });
  }
};

export const deletePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await PaymentModel.delete(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'Payment not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Payment deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete payment',
    });
  }
};

/**
 * Checkout endpoint
 * Creates a Stripe checkout session for a new payment
 * Integrates with frontend /checkout route
 */
export const createCheckout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { client, class_id, amount, description, success_url, cancel_url } = req.body;

    console.log('🛒 [CHECKOUT]: Creating checkout session');
    console.log(`   Client: ${client.name} (${client.email})`);
    console.log(`   Amount: $${amount.toFixed(2)}`);

    // Step 1: Find or create client
    let existingClient = await ClientModel.findByEmail(client.email);

    if (!existingClient) {
      console.log('   Creating new client...');
      existingClient = await ClientModel.create({
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
      });
      console.log(`   ✅ Client created: ID ${existingClient.id}`);
    } else {
      console.log(`   ✅ Existing client found: ID ${existingClient.id}`);
    }

    // Step 2: Get class information if class_id is provided
    let classInfo = null;
    if (class_id) {
      classInfo = await ClassModel.findById(class_id);
      if (!classInfo) {
        res.status(404).json({
          success: false,
          error: 'Class not found',
        });
        return;
      }
    }

    // Step 3: Create Stripe checkout session
    const session = await stripeService.createCheckoutSession({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      successUrl: success_url,
      cancelUrl: cancel_url,
      customerEmail: client.email,
      metadata: {
        client_id: existingClient.id.toString(),
        class_id: class_id?.toString() || '',
        description: description || (classInfo ? classInfo.name : 'Class Membership'),
      },
    });

    console.log(`   ✅ Checkout session created: ${session.id}`);

    // Step 4: Create pending payment record
    const payment = await PaymentModel.create({
      client_id: existingClient.id,
      amount: amount,
      status: 'pending',
      stripe_id: session.payment_intent,
      description: description || (classInfo ? `${classInfo.name} - Membership` : 'Class Membership'),
    });

    console.log(`   ✅ Payment record created: ID ${payment.id}`);

    // Step 5: Generate release form PDF
    try {
      const releasePdf = await pdfService.generateReleaseForm({
        client: existingClient,
      });

      // Upload to storage (mocked)
      const pdfUrl = await pdfService.uploadToStorage(releasePdf.buffer, releasePdf.filename);

      // Create release form record
      const releaseForm = await ReleaseFormModel.create({
        client_id: existingClient.id,
        signed_pdf_url: pdfUrl,
        is_signed: false,
      });

      console.log(`   ✅ Release form created: ID ${releaseForm.id}`);
    } catch (pdfError) {
      console.warn('   ⚠️  Failed to generate release form:', pdfError);
      // Continue without release form - don't fail the checkout
    }

    // Return checkout session URL
    res.status(201).json({
      success: true,
      data: {
        checkout_url: session.url,
        session_id: session.id,
        payment_id: payment.id,
        client_id: existingClient.id,
      },
    });
  } catch (error) {
    console.error('❌ Error creating checkout:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create checkout session',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Payment confirmation endpoint
 * Confirms a payment and triggers notifications
 * Called after successful Stripe payment
 */
export const confirmPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { payment_intent_id, client_id, metadata } = req.body;

    console.log('✅ [CONFIRM PAYMENT]: Processing payment confirmation');
    console.log(`   Payment Intent ID: ${payment_intent_id}`);

    // Step 1: Verify payment with Stripe
    const paymentIntent = await stripeService.retrievePaymentIntent(payment_intent_id);

    if (!paymentIntent) {
      res.status(404).json({
        success: false,
        error: 'Payment intent not found',
      });
      return;
    }

    if (paymentIntent.status !== 'succeeded') {
      res.status(400).json({
        success: false,
        error: 'Payment has not succeeded',
        status: paymentIntent.status,
      });
      return;
    }

    console.log(`   Payment verified: ${paymentIntent.status}`);

    // Step 2: Find and update payment record
    // Try to find by stripe_id first, then by client_id if provided
    const payments = await PaymentModel.findAll();
    let payment: any = payments.find((p) => p.stripe_id === payment_intent_id);

    if (!payment && client_id) {
      // Create new payment record if not found
      payment = await PaymentModel.create({
        client_id: client_id,
        amount: paymentIntent.amount / 100,
        status: 'completed',
        stripe_id: payment_intent_id,
        description: metadata?.description || 'Class Membership',
      });
      console.log(`   ✅ New payment record created: ID ${payment.id}`);
    } else if (payment && payment.status !== 'completed') {
      // Update existing payment
      payment = await PaymentModel.update(payment.id, {
        status: 'completed',
        updated_at: new Date(),
      });
      console.log(`   ✅ Payment updated to completed: ID ${payment?.id}`);
    }

    if (!payment) {
      res.status(404).json({
        success: false,
        error: 'Payment record not found',
      });
      return;
    }

    // Step 3: Get client information
    const client = await ClientModel.findById(payment.client_id);

    if (!client) {
      res.status(404).json({
        success: false,
        error: 'Client not found',
      });
      return;
    }

    // Step 4: Get release form if available
    const releaseForm = await ReleaseFormModel.findByClientId(client.id);

    // Step 5: Send notifications
    try {
      const confirmationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/confirmation/${payment.id}`;

      await notificationService.sendPaymentConfirmationNotifications({
        clientName: client.name,
        clientEmail: client.email,
        clientPhone: client.phone,
        confirmationUrl,
        releaseFormUrl: releaseForm?.signed_pdf_url,
        paymentAmount: payment.amount,
        paymentId: payment.id,
      });

      console.log(`   ✅ Notifications sent successfully`);
    } catch (notificationError) {
      console.error('   ⚠️  Failed to send notifications:', notificationError);
      // Continue - payment is still confirmed
    }

    // Return success response
    res.json({
      success: true,
      data: {
        payment_id: payment.id,
        status: 'completed',
        amount: payment.amount,
        client: {
          id: client.id,
          name: client.name,
          email: client.email,
        },
        release_form: releaseForm
          ? {
              id: releaseForm.id,
              url: releaseForm.signed_pdf_url,
            }
          : null,
      },
      message: 'Payment confirmed successfully',
    });
  } catch (error) {
    console.error('❌ Error confirming payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to confirm payment',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Stripe webhook endpoint
 * Handles webhook events from Stripe
 * Important: This endpoint should not require authentication
 */
export const handleStripeWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const signature = req.headers['stripe-signature'];

    if (!signature || typeof signature !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Missing stripe-signature header',
      });
      return;
    }

    console.log('🔔 [STRIPE WEBHOOK]: Received webhook event');

    // Verify webhook signature
    const event = stripeService.verifyWebhookSignature(req.body, signature);

    console.log(`   Event type: ${event.type}`);
    console.log(`   Event ID: ${event.id}`);

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;

      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      default:
        console.log(`   ℹ️  Unhandled event type: ${event.type}`);
    }

    // Return 200 to acknowledge receipt
    res.json({ received: true });
  } catch (error) {
    console.error('❌ Error handling webhook:', error);
    res.status(400).json({
      success: false,
      error: 'Webhook handler failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Helper functions for webhook handling
async function handlePaymentIntentSucceeded(paymentIntent: any): Promise<void> {
  console.log('   ✅ Payment intent succeeded:', paymentIntent.id);

  // Update payment status
  const payments = await PaymentModel.findAll();
  const payment = payments.find((p) => p.stripe_id === paymentIntent.id);

  if (payment && payment.status !== 'completed') {
    await PaymentModel.update(payment.id, { status: 'completed' });
    console.log(`   Updated payment ${payment.id} to completed`);
  }
}

async function handlePaymentIntentFailed(paymentIntent: any): Promise<void> {
  console.log('   ❌ Payment intent failed:', paymentIntent.id);

  // Update payment status
  const payments = await PaymentModel.findAll();
  const payment = payments.find((p) => p.stripe_id === paymentIntent.id);

  if (payment) {
    await PaymentModel.update(payment.id, { status: 'failed' });
    console.log(`   Updated payment ${payment.id} to failed`);
  }
}

async function handleCheckoutSessionCompleted(session: any): Promise<void> {
  console.log('   ✅ Checkout session completed:', session.id);

  // The payment intent should have already been handled
  // This is mainly for logging and tracking
  if (session.payment_intent) {
    console.log(`   Associated payment intent: ${session.payment_intent}`);
  }
}
