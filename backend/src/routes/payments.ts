import { Router } from 'express';
import {
  getAllPayments,
  getPaymentById,
  getPaymentsByClientId,
  createPayment,
  updatePayment,
  deletePayment,
} from '../controllers/paymentController';

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

export default router;
