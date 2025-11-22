import express from 'express';
import { body } from 'express-validator';
import {
  createBicycle,
  getBicycles,
  getBicycleById,
  updateBicycle,
  deleteBicycle,
  getMyListings
} from '../controllers/bicycleController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Validation rules
const bicycleValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value) => value >= 0)
    .withMessage('Price cannot be negative'),
  body('condition')
    .notEmpty()
    .withMessage('Condition is required')
    .isIn(['new', 'good', 'used'])
    .withMessage('Invalid condition'),
  body('type')
    .notEmpty()
    .withMessage('Bicycle type is required')
    .isIn(['mountain', 'road', 'city', 'hybrid', 'electric', 'bmx'])
    .withMessage('Invalid bicycle type'),
  body('gearType')
    .notEmpty()
    .withMessage('Gear type is required')
    .isIn(['no-gear', 'single', '7-speed', '21-speed', '24-speed'])
    .withMessage('Invalid gear type'),
  body('purchaseYear')
    .notEmpty()
    .withMessage('Purchase year is required')
    .isInt({ min: 1990, max: new Date().getFullYear() })
    .withMessage('Invalid purchase year'),
  body('images')
    .isArray({ min: 1, max: 5 })
    .withMessage('Please provide between 1 and 5 images')
];

// Routes
router.get('/my-listings', protect, getMyListings);
router.get('/:id', getBicycleById);
router.get('/', getBicycles);
router.post('/', protect, bicycleValidation, validate, createBicycle);
router.put('/:id', protect, updateBicycle);
router.delete('/:id', protect, deleteBicycle);

export default router;
