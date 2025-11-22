import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import bicycleRoutes from './routes/bicycleRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(express.json({ limit: '50mb' })); // Increase limit for base64 images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// CORS configuration - Allow both development ports
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bicycle Marketplace API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      bicycles: '/api/bicycles'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bicycles', bicycleRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚲 Bicycle Marketplace API Server                      ║
║                                                           ║
║   Server running on port ${PORT}                            ║
║   Environment: ${process.env.NODE_ENV || 'development'}                              ║
║   Database: MongoDB Connected                             ║
║                                                           ║
║   Auth Endpoints:                                         ║
║   - POST /api/auth/signup                                 ║
║   - POST /api/auth/verify-otp                             ║
║   - POST /api/auth/resend-otp                             ║
║   - POST /api/auth/login                                  ║
║   - GET  /api/auth/me                                     ║
║                                                           ║
║   Bicycle Endpoints:                                      ║
║   - GET    /api/bicycles                                  ║
║   - POST   /api/bicycles                                  ║
║   - GET    /api/bicycles/:id                              ║
║   - PUT    /api/bicycles/:id                              ║
║   - DELETE /api/bicycles/:id                              ║
║   - GET    /api/bicycles/my-listings                      ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});
