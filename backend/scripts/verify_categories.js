import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Products from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

const verifyCategories = async () => {
  try {
    await connectDB();

    // Wait for connection
    await new Promise(resolve => setTimeout(resolve, 1000));

    const allProducts = await Products.find({});
    console.log('\n=== TOTAL PRODUCTS ===');
    console.log('Total:', allProducts.length);

    console.log('\n=== PRODUCTS BY CATEGORY ===');
    const categories = {};
    allProducts.forEach(p => {
      if (!categories[p.category]) {
        categories[p.category] = [];
      }
      categories[p.category].push(p.name);
    });

    Object.keys(categories).forEach(cat => {
      console.log(`\n${cat} (${categories[cat].length} products):`);
      categories[cat].forEach(name => console.log(`  - ${name}`));
    });

    console.log('\n=== TESTING CATEGORY FILTER ===');
    const mobileProducts = await Products.find({ category: 'Mobile' });
    console.log('Mobile products found:', mobileProducts.length);
    mobileProducts.forEach(p => console.log(`  - ${p.name}`));

    const kitchenProducts = await Products.find({ category: 'Kitchen & Home' });
    console.log('\nKitchen & Home products found:', kitchenProducts.length);
    kitchenProducts.forEach(p => console.log(`  - ${p.name}`));

    const fashionProducts = await Products.find({ category: 'Fashion' });
    console.log('\nFashion products found:', fashionProducts.length);
    fashionProducts.forEach(p => console.log(`  - ${p.name}`));

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

verifyCategories();
