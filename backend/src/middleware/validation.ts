/**
 * Validation Middleware
 * Uses Zod for request validation
 */

import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodSchema } from 'zod';

/**
 * Validation schemas for different entities
 */

// Client schemas
export const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().optional(),
});

export const updateClientSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

// Class schemas
export const createClassSchema = z.object({
  name: z.string().min(1, 'Class name is required').max(255),
  description: z.string().optional(),
  schedule: z.string().optional(),
  price: z.number().positive('Price must be positive'),
});

export const updateClassSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  schedule: z.string().optional(),
  price: z.number().positive().optional(),
});

// Payment schemas
export const createPaymentSchema = z.object({
  client_id: z.number().int().positive('Valid client ID is required'),
  amount: z.number().positive('Amount must be positive'),
  status: z.enum(['pending', 'completed', 'failed', 'refunded']),
  stripe_id: z.string().optional(),
  description: z.string().optional(),
});

export const updatePaymentSchema = z.object({
  amount: z.number().positive().optional(),
  status: z.enum(['pending', 'completed', 'failed', 'refunded']).optional(),
  stripe_id: z.string().optional(),
  description: z.string().optional(),
});

// Release form schemas
export const createReleaseFormSchema = z.object({
  client_id: z.number().int().positive('Valid client ID is required'),
  signed_pdf_url: z.string().url().optional(),
  signed_date: z.string().datetime().optional().or(z.date().optional()),
  is_signed: z.boolean(),
});

export const updateReleaseFormSchema = z.object({
  signed_pdf_url: z.string().url().optional(),
  signed_date: z.string().datetime().optional().or(z.date().optional()),
  is_signed: z.boolean().optional(),
});

// Checkout schema
export const checkoutSchema = z.object({
  client: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(1, { message: 'Phone is required' }),
    address: z.string().optional(),
  }),
  class_id: z.number().int().positive({ message: 'Valid class ID is required' }).optional(),
  amount: z.number().positive({ message: 'Amount must be positive' }),
  description: z.string().optional(),
  success_url: z.string().url({ message: 'Valid success URL is required' }),
  cancel_url: z.string().url({ message: 'Valid cancel URL is required' }),
});

// Payment confirmation schema
export const paymentConfirmationSchema = z.object({
  payment_intent_id: z.string().min(1, { message: 'Payment intent ID is required' }),
  client_id: z.number().int().positive().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

/**
 * Validation middleware factory
 * Creates middleware that validates request body against a Zod schema
 */
export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate request body
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors into a user-friendly format
        const errors = error.issues.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors,
        });
        return;
      }

      // Handle other errors
      console.error('Validation error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error during validation',
      });
    }
  };
};

/**
 * Validate path parameters
 */
export const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    res.status(400).json({
      success: false,
      error: 'Invalid ID parameter',
    });
    return;
  }

  // Store parsed ID for use in controllers
  req.params.id = id.toString();
  next();
};

/**
 * Validate pagination parameters
 */
export const validatePagination = (req: Request, res: Response, next: NextFunction): void => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  if (page < 1) {
    res.status(400).json({
      success: false,
      error: 'Page must be greater than 0',
    });
    return;
  }

  if (limit < 1 || limit > 100) {
    res.status(400).json({
      success: false,
      error: 'Limit must be between 1 and 100',
    });
    return;
  }

  // Store parsed pagination for use in controllers
  req.query.page = page.toString();
  req.query.limit = limit.toString();

  next();
};
