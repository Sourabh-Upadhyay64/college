import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyListings
} from '../controllers/productController.js';

const router = express.Router();

router.get('/my-listings', protect, getMyListings);
router.get('/', getProducts);
router.post('/', protect, createProduct);
router.get('/:id', getProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
