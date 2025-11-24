import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Products from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

const testUpdate = async () => {
  try {
    await connectDB();
    await new Promise(resolve => setTimeout(resolve, 1000));

    const productId = '6923e4fd7884e3832ee0dc83';

    console.log('\n=== Testing Product Update ===\n');

    // Find the product first
    const product = await Products.findById(productId);

    if (!product) {
      console.log('❌ Product not found!');
      process.exit(1);
    }

    console.log('✅ Product found:', product.name);
    console.log('Current data:', {
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      brand: product.brand
    });

    // Try to update
    console.log('\n--- Attempting Update ---');
    product.name = 'Samsung QLED 4K TV 65"';
    product.price = 1299;
    product.description = 'Samsung QLED 4K TV 65"';
    product.brand = 'Samsung';
    product.category = 'Electronics';
    product.stock = 10;
    product.images = [{ url: 'https://i.pinimg.com/736x/d3/09/a1/d309a155ea7911dbcfba76985f44c847.jpg' }];

    const updated = await product.save();
    console.log('✅ Update successful!');
    console.log('Updated data:', {
      name: updated.name,
      price: updated.price,
      stock: updated.stock
    });

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

testUpdate();
