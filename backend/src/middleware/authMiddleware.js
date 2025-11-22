import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { formatErrorResponse } from '../utils/helpers.js';

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json(
      formatErrorResponse('Not authorized. Please login to access this route.')
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json(
        formatErrorResponse('User not found. Please login again.')
      );
    }

    // Check if user is verified
    if (!req.user.isVerified) {
      return res.status(403).json(
        formatErrorResponse('Please verify your email to access this route.')
      );
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json(
        formatErrorResponse('Invalid token. Please login again.')
      );
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json(
        formatErrorResponse('Token expired. Please login again.')
      );
    }

    return res.status(401).json(
      formatErrorResponse('Not authorized. Please login again.')
    );
  }
};

// Admin only access
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json(
      formatErrorResponse('Access denied. Admin privileges required.')
    );
  }
};
