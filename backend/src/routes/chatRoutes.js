import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getOrCreateChat,
  getUserChats,
  sendMessage,
  getChatById
} from '../controllers/chatController.js';

const router = express.Router();

router.post('/', protect, getOrCreateChat);
router.get('/', protect, getUserChats);
router.get('/:id', protect, getChatById);
router.post('/:id/messages', protect, sendMessage);

export default router;
