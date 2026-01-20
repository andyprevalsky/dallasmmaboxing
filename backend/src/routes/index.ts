import { Router } from 'express';
import classesRouter from './classes';
import clientsRouter from './clients';
import paymentsRouter from './payments';
import formsRouter from './forms';

const router = Router();

// Mount all route modules
router.use('/classes', classesRouter);
router.use('/clients', clientsRouter);
router.use('/payments', paymentsRouter);
router.use('/forms', formsRouter);

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Dallas MMA Boxing API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
