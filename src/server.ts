import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import authRoutes from './routes/auth.routes';
import { testConnection } from './config/database';
import { testStellarConnection } from './config/stellar';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true
}));
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'MentorMinds Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mount routes
app.use('/api/v1/auth', authRoutes);

// API Routes
app.get('/api/v1', (_req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to MentorMinds Stellar API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      mentors: '/api/v1/mentors',
      bookings: '/api/v1/bookings',
      payments: '/api/v1/payments',
      wallets: '/api/v1/wallets'
    }
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}/api/v1`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
  // Verify external connections on boot
  await testConnection();
  await testStellarConnection();
});

export default app;
