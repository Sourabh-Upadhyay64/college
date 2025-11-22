import { validationResult } from 'express-validator';
import { formatErrorResponse } from '../utils/helpers.js';

// Validate request using express-validator
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));
    
    return res.status(400).json(
      formatErrorResponse('Validation failed', formattedErrors)
    );
  }
  
  next();
};
