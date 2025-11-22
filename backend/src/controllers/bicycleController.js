import Bicycle from '../models/Bicycle.js';
import { formatErrorResponse, formatSuccessResponse } from '../utils/helpers.js';

// @desc    Create new bicycle listing
// @route   POST /api/bicycles
// @access  Private
export const createBicycle = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      condition,
      type,
      gearType,
      purchaseYear,
      images
    } = req.body;

    // Validate required fields
    if (!title || !description || !price || !condition || !type || !gearType || !purchaseYear) {
      return res.status(400).json(
        formatErrorResponse('Please provide all required fields')
      );
    }

    // Validate images
    if (!images || images.length === 0) {
      return res.status(400).json(
        formatErrorResponse('Please provide at least one image')
      );
    }

    if (images.length > 5) {
      return res.status(400).json(
        formatErrorResponse('Maximum 5 images allowed')
      );
    }

    // Create bicycle listing
    const bicycle = await Bicycle.create({
      title,
      description,
      price,
      condition,
      type,
      gearType,
      purchaseYear,
      images,
      seller: req.user._id
    });

    res.status(201).json(
      formatSuccessResponse(
        'Bicycle listed successfully!',
        {
          bicycle: {
            id: bicycle._id,
            title: bicycle.title,
            price: bicycle.price,
            condition: bicycle.condition,
            type: bicycle.type,
            createdAt: bicycle.createdAt
          }
        }
      )
    );
  } catch (error) {
    console.error('Create bicycle error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Get all bicycles with filters
// @route   GET /api/bicycles
// @access  Public
export const getBicycles = async (req, res) => {
  try {
    const {
      condition,
      type,
      minPrice,
      maxPrice,
      search,
      sort = '-createdAt',
      page = 1,
      limit = 12
    } = req.query;

    // Build query
    const query = { status: 'available' };

    if (condition && condition !== 'all') {
      query.condition = condition;
    }

    if (type && type !== 'all') {
      query.type = type;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    
    const bicycles = await Bicycle.find(query)
      .populate('seller', 'name email phone')
      .sort(sort)
      .limit(Number(limit))
      .skip(skip);

    const total = await Bicycle.countDocuments(query);

    res.status(200).json(
      formatSuccessResponse(
        'Bicycles retrieved successfully',
        {
          bicycles,
          pagination: {
            total,
            page: Number(page),
            pages: Math.ceil(total / limit)
          }
        }
      )
    );
  } catch (error) {
    console.error('Get bicycles error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Get single bicycle by ID
// @route   GET /api/bicycles/:id
// @access  Public
export const getBicycleById = async (req, res) => {
  try {
    const bicycle = await Bicycle.findById(req.params.id)
      .populate('seller', 'name email phone createdAt');

    if (!bicycle) {
      return res.status(404).json(
        formatErrorResponse('Bicycle not found')
      );
    }

    // Increment views
    bicycle.views += 1;
    await bicycle.save();

    res.status(200).json(
      formatSuccessResponse(
        'Bicycle retrieved successfully',
        { bicycle }
      )
    );
  } catch (error) {
    console.error('Get bicycle error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json(
        formatErrorResponse('Bicycle not found')
      );
    }

    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Update bicycle listing
// @route   PUT /api/bicycles/:id
// @access  Private
export const updateBicycle = async (req, res) => {
  try {
    const bicycle = await Bicycle.findById(req.params.id);

    if (!bicycle) {
      return res.status(404).json(
        formatErrorResponse('Bicycle not found')
      );
    }

    // Check ownership
    if (bicycle.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json(
        formatErrorResponse('Not authorized to update this listing')
      );
    }

    const {
      title,
      description,
      price,
      condition,
      type,
      gearType,
      purchaseYear,
      images,
      status
    } = req.body;

    // Update fields
    if (title) bicycle.title = title;
    if (description) bicycle.description = description;
    if (price) bicycle.price = price;
    if (condition) bicycle.condition = condition;
    if (type) bicycle.type = type;
    if (gearType) bicycle.gearType = gearType;
    if (purchaseYear) bicycle.purchaseYear = purchaseYear;
    if (images) bicycle.images = images;
    if (status) bicycle.status = status;

    await bicycle.save();

    res.status(200).json(
      formatSuccessResponse(
        'Bicycle updated successfully',
        { bicycle }
      )
    );
  } catch (error) {
    console.error('Update bicycle error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Delete bicycle listing
// @route   DELETE /api/bicycles/:id
// @access  Private
export const deleteBicycle = async (req, res) => {
  try {
    const bicycle = await Bicycle.findById(req.params.id);

    if (!bicycle) {
      return res.status(404).json(
        formatErrorResponse('Bicycle not found')
      );
    }

    // Check ownership
    if (bicycle.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json(
        formatErrorResponse('Not authorized to delete this listing')
      );
    }

    // Soft delete by updating status
    bicycle.status = 'deleted';
    await bicycle.save();

    res.status(200).json(
      formatSuccessResponse('Bicycle listing deleted successfully')
    );
  } catch (error) {
    console.error('Delete bicycle error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};

// @desc    Get user's bicycle listings
// @route   GET /api/bicycles/my-listings
// @access  Private
export const getMyListings = async (req, res) => {
  try {
    const bicycles = await Bicycle.find({
      seller: req.user._id,
      status: { $ne: 'deleted' }
    }).sort('-createdAt');

    res.status(200).json(
      formatSuccessResponse(
        'Your listings retrieved successfully',
        {
          bicycles,
          total: bicycles.length
        }
      )
    );
  } catch (error) {
    console.error('Get my listings error:', error);
    res.status(500).json(
      formatErrorResponse('Server error. Please try again.')
    );
  }
};
