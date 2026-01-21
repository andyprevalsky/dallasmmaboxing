import { Router } from 'express';
import {
  getAllPayments,
  getPaymentById,
  getPaymentsByClientId,
  createPayment,
  updatePayment,
  deletePayment,
  createCheckout,
  confirmPayment,
  handleStripeWebhook,
} from '../controllers/paymentController';
import { validateRequest, checkoutSchema, paymentConfirmationSchema } from '../middleware/validation';

const router = Router();

// GET /api/payments - Get all payments
router.get('/', getAllPayments);

// GET /api/payments/:id - Get a specific payment by ID
router.get('/:id', getPaymentById);

// GET /api/payments/client/:clientId - Get all payments for a specific client
router.get('/client/:clientId', getPaymentsByClientId);

// POST /api/payments - Create a new payment
router.post('/', createPayment);

// PUT /api/payments/:id - Update a payment
router.put('/:id', updatePayment);

// DELETE /api/payments/:id - Delete a payment
router.delete('/:id', deletePayment);

// POST /api/payments/checkout - Create a checkout session (integrates with frontend /checkout route)
router.post('/checkout', validateRequest(checkoutSchema), createCheckout);

// POST /api/payments/confirm - Confirm a payment after Stripe success
router.post('/confirm', validateRequest(paymentConfirmationSchema), confirmPayment);

// POST /api/payments/webhook - Stripe webhook endpoint (no auth required)
router.post('/webhook', handleStripeWebhook);

export default router;
