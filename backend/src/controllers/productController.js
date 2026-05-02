import Product from '../models/Product.js';
import { formatErrorResponse, formatSuccessResponse } from '../utils/helpers.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { 
      category, 
      condition, 
      minPrice, 
      maxPrice, 
      search, 
      sort = '-createdAt',
      status = 'available'
    } = req.query;

    // Build query
    const query = { status };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (condition && condition !== 'all') {
      query.condition = condition;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query)
      .populate('seller', 'name email phone')
      .sort(sort);

    res.status(200).json(
      formatSuccessResponse(
        'Products retrieved successfully',
        { products, count: products.length }
      )
    );
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name email phone profilePicture');

    if (!product) {
      return res.status(404).json(
        formatErrorResponse('Product not found')
      );
    }

    // Increment views
    product.views += 1;
    await product.save();

    res.status(200).json(
      formatSuccessResponse('Product retrieved successfully', { product })
    );
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      price, 
      condition, 
      category,
      subcategory,
      images,
      location
    } = req.body;

    // Validate required fields
    if (!title || !description || !price || !condition || !category || !images) {
      return res.status(400).json(
        formatErrorResponse('Please provide all required fields')
      );
    }

    // Create product
    const product = await Product.create({
      title,
      description,
      price,
      condition,
      category,
      subcategory,
      images,
      location,
      seller: req.user.id
    });

    res.status(201).json(
      formatSuccessResponse('Product listed successfully', { product })
    );
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json(
        formatErrorResponse('Product not found')
      );
    }

    // Check if user is the seller
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json(
        formatErrorResponse('You are not authorized to update this product')
      );
    }

    const { 
      title, 
      description, 
      price, 
      condition,
      category,
      subcategory,
      images,
      location,
      status
    } = req.body;

    // Update fields
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (condition) product.condition = condition;
    if (category) product.category = category;
    if (subcategory !== undefined) product.subcategory = subcategory;
    if (images) product.images = images;
    if (location !== undefined) product.location = location;
    if (status) product.status = status;

    await product.save();

    res.status(200).json(
      formatSuccessResponse('Product updated successfully', { product })
    );
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json(
        formatErrorResponse('Product not found')
      );
    }

    // Check if user is the seller
    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json(
        formatErrorResponse('You are not authorized to delete this product')
      );
    }

    // Soft delete
    product.status = 'deleted';
    await product.save();

    res.status(200).json(
      formatSuccessResponse('Product deleted successfully')
    );
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Get current user's products
// @route   GET /api/products/my-listings
// @access  Private
export const getMyListings = async (req, res) => {
  try {
    const products = await Product.find({
      seller: req.user.id,
      status: { $ne: 'deleted' }
    }).sort('-createdAt');

    res.status(200).json(
      formatSuccessResponse(
        'Your listings retrieved successfully',
        { products, count: products.length }
      )
    );
  } catch (error) {
    console.error('Get my listings error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};
