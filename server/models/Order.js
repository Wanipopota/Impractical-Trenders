const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending'
  },
  total: {
    type: Number,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;