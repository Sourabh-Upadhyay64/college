import { formatErrorResponse } from '../utils/helpers.js';

// Global error handler
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json(
      formatErrorResponse(`${field} already exists. Please use a different value.`)
    );
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json(
      formatErrorResponse('Validation failed', errors)
    );
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json(
      formatErrorResponse('Invalid ID format')
    );
  }

  // Default error
  res.status(err.statusCode || 500).json(
    formatErrorResponse(err.message || 'Server error')
  );
};

// Not found handler
const notFound = (req, res) => {
  res.status(404).json(
    formatErrorResponse(`Route ${req.originalUrl} not found`)
  );
};

export { errorHandler, notFound };
