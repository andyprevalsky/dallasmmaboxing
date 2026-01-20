import { Request, Response } from 'express';
import { PaymentModel } from '../models/Payment';
import { ClientModel } from '../models/Client';
import { ReleaseFormModel } from '../models/ReleaseForm';
import { notificationService } from '../services/notificationService';

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
