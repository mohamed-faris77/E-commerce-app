// models/User.js
import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    min: [0, "Price cannot be negative"],
  },
  category: {
    type: String,
    required: [true, "Please specify product category"],
  },
  brand: {
    type: String,
    default: "Generic",
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    min: [0, "Stock cannot be negative"],
    default: 1,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
  discount: {
    type: Number, // in percentage (optional)
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // admin who added it
  },
}, { timestamps: true });

const Products = mongoose.model('Products', productsSchema);
export default Products;
