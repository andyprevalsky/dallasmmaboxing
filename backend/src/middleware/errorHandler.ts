import { Request, Response, NextFunction } from 'express';

/**
 * Custom Application Errors
 */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public details?: any) {
    super(400, message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, `${resource} not found`);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(401, message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(403, message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

/**
 * Error Handler Middleware
 * Catches and formats all errors
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log error details
  console.error('❌ [ERROR]:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    body: req.body,
  });

  // Handle custom app errors
  if (err instanceof AppError) {
    const response: any = {
      success: false,
      error: err.message,
    };

    // Add validation details if available
    if (err instanceof ValidationError && err.details) {
      response.details = err.details;
    }

    res.status(err.statusCode).json(response);
    return;
  }

  // Handle database errors
  if (isDatabaseError(err)) {
    const dbError = handleDatabaseError(err);
    res.status(dbError.statusCode).json({
      success: false,
      error: dbError.message,
    });
    return;
  }

  // Handle unexpected errors
  const isDev = process.env.NODE_ENV === 'development';
  res.status(500).json({
    success: false,
    error: isDev ? err.message : 'Internal server error',
    ...(isDev && { stack: err.stack }),
  });
};

/**
 * 404 Not Found Handler
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`,
    availableEndpoints: [
      'GET /api/health',
      'GET /api/classes',
      'GET /api/clients',
      'GET /api/payments',
      'POST /api/payments/checkout',
      'POST /api/payments/confirm',
      'GET /api/forms',
    ],
  });
};

/**
 * Check if error is a database error
 */
function isDatabaseError(err: any): boolean {
  return err.code !== undefined && (
    err.code.startsWith('22') || // Data exception
    err.code.startsWith('23') || // Integrity constraint violation
    err.code.startsWith('42') || // Syntax error or access rule violation
    err.code === '08000' ||      // Connection exception
    err.code === '08003' ||      // Connection does not exist
    err.code === '08006'         // Connection failure
  );
}

/**
 * Handle database-specific errors
 */
function handleDatabaseError(err: any): AppError {
  // Unique violation
  if (err.code === '23505') {
    const match = err.detail?.match(/Key \((.+?)\)=/);
    const field = match ? match[1] : 'field';
    return new ConflictError(`${field} already exists`);
  }

  // Foreign key violation
  if (err.code === '23503') {
    return new ValidationError('Referenced record does not exist');
  }

  // Not null violation
  if (err.code === '23502') {
    const field = err.column || 'field';
    return new ValidationError(`${field} is required`);
  }

  // Connection error
  if (err.code === '08000' || err.code === '08003' || err.code === '08006') {
    return new AppError(503, 'Database connection failed');
  }

  // Generic database error
  return new AppError(500, 'Database error occurred');
}

/**
 * Async error wrapper
 * Wraps async route handlers to catch errors
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
