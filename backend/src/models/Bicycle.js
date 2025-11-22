import mongoose from 'mongoose';

const bicycleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  condition: {
    type: String,
    required: [true, 'Please provide condition'],
    enum: ['new', 'good', 'used']
  },
  type: {
    type: String,
    required: [true, 'Please provide bicycle type'],
    enum: ['mountain', 'road', 'city', 'hybrid', 'electric', 'bmx']
  },
  gearType: {
    type: String,
    required: [true, 'Please provide gear type'],
    enum: ['no-gear', 'single', '7-speed', '21-speed', '24-speed']
  },
  purchaseYear: {
    type: Number,
    required: [true, 'Please provide purchase year'],
    min: [1990, 'Year must be after 1990'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  images: {
    type: [String],
    validate: {
      validator: function(arr) {
        return arr.length > 0 && arr.length <= 5;
      },
      message: 'Please provide between 1 and 5 images'
    }
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'deleted'],
    default: 'available'
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
bicycleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better query performance
bicycleSchema.index({ seller: 1, status: 1 });
bicycleSchema.index({ price: 1 });
bicycleSchema.index({ createdAt: -1 });

const Bicycle = mongoose.model('Bicycle', bicycleSchema);

export default Bicycle;
