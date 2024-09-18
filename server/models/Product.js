const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for comments
const commentSchema = new Schema({
  commentText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the product schema to include comments
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
  },
  // Add an array of comments
  comments: [commentSchema], // Embedded comment schema
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
