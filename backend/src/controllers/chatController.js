import Chat from '../models/Chat.js';
import Bicycle from '../models/Bicycle.js';
import { formatErrorResponse, formatSuccessResponse } from '../utils/helpers.js';

// @desc    Get or create a chat
// @route   POST /api/chats
// @access  Private
export const getOrCreateChat = async (req, res) => {
  try {
    const { bicycleId } = req.body;
    const buyerId = req.user.id;

    if (!bicycleId) {
      return res.status(400).json(
        formatErrorResponse('Please provide bicycle ID')
      );
    }

    // Get bicycle details
    const bicycle = await Bicycle.findById(bicycleId).populate('seller');
    
    if (!bicycle) {
      return res.status(404).json(
        formatErrorResponse('Bicycle not found')
      );
    }

    // Check if user is trying to chat with themselves
    if (bicycle.seller._id.toString() === buyerId) {
      return res.status(400).json(
        formatErrorResponse('You cannot chat with yourself')
      );
    }

    // Check if chat already exists
    let chat = await Chat.findOne({
      bicycle: bicycleId,
      buyer: buyerId,
      seller: bicycle.seller._id
    })
      .populate('buyer', 'name email phone profilePicture')
      .populate('seller', 'name email phone profilePicture')
      .populate('bicycle', 'title price images condition');

    // Create new chat if it doesn't exist
    if (!chat) {
      chat = await Chat.create({
        bicycle: bicycleId,
        buyer: buyerId,
        seller: bicycle.seller._id,
        messages: []
      });

      chat = await Chat.findById(chat._id)
        .populate('buyer', 'name email phone profilePicture')
        .populate('seller', 'name email phone profilePicture')
        .populate('bicycle', 'title price images condition');
    }

    res.status(200).json(
      formatSuccessResponse('Chat retrieved successfully', { chat })
    );
  } catch (error) {
    console.error('Get/Create chat error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Get all chats for current user
// @route   GET /api/chats
// @access  Private
export const getUserChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({
      $or: [{ buyer: userId }, { seller: userId }]
    })
      .populate('buyer', 'name email phone profilePicture')
      .populate('seller', 'name email phone profilePicture')
      .populate('bicycle', 'title price images condition')
      .sort({ lastMessage: -1 });

    res.status(200).json(
      formatSuccessResponse('Chats retrieved successfully', { chats })
    );
  } catch (error) {
    console.error('Get user chats error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Send a message
// @route   POST /api/chats/:id/messages
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const senderId = req.user.id;

    if (!content || !content.trim()) {
      return res.status(400).json(
        formatErrorResponse('Message content is required')
      );
    }

    const chat = await Chat.findById(id);

    if (!chat) {
      return res.status(404).json(
        formatErrorResponse('Chat not found')
      );
    }

    // Verify user is part of this chat
    if (chat.buyer.toString() !== senderId && chat.seller.toString() !== senderId) {
      return res.status(403).json(
        formatErrorResponse('You are not authorized to send messages in this chat')
      );
    }

    // Add message
    chat.messages.push({
      sender: senderId,
      content: content.trim(),
      timestamp: new Date()
    });

    chat.lastMessage = new Date();
    await chat.save();

    // Populate and return updated chat
    const updatedChat = await Chat.findById(id)
      .populate('buyer', 'name email phone profilePicture')
      .populate('seller', 'name email phone profilePicture')
      .populate('bicycle', 'title price images condition')
      .populate('messages.sender', 'name profilePicture');

    res.status(200).json(
      formatSuccessResponse('Message sent successfully', { chat: updatedChat })
    );
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Get chat by ID
// @route   GET /api/chats/:id
// @access  Private
export const getChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(id)
      .populate('buyer', 'name email phone profilePicture')
      .populate('seller', 'name email phone profilePicture')
      .populate('bicycle', 'title price images condition')
      .populate('messages.sender', 'name profilePicture');

    if (!chat) {
      return res.status(404).json(
        formatErrorResponse('Chat not found')
      );
    }

    // Verify user is part of this chat
    if (chat.buyer._id.toString() !== userId && chat.seller._id.toString() !== userId) {
      return res.status(403).json(
        formatErrorResponse('You are not authorized to view this chat')
      );
    }

    // Mark messages as read for the current user
    chat.messages.forEach(message => {
      if (message.sender._id.toString() !== userId) {
        message.read = true;
      }
    });
    await chat.save();

    res.status(200).json(
      formatSuccessResponse('Chat retrieved successfully', { chat })
    );
  } catch (error) {
    console.error('Get chat error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};
