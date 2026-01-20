import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use('/api', routes);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Dallas MMA Boxing API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      classes: '/api/classes',
      clients: '/api/clients',
      payments: '/api/payments',
      forms: '/api/forms',
    },
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log('');
  console.log('Available endpoints:');
  console.log(`  GET  /api/health              - Health check`);
  console.log(`  GET  /api/classes             - Get all classes`);
  console.log(`  GET  /api/clients             - Get all clients`);
  console.log(`  GET  /api/payments            - Get all payments`);
  console.log(`  GET  /api/forms               - Get all release forms`);
});

export default app;
