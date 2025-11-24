import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import Products from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const checkData = async () => {
  try {
    const products = await Products.find({});
    console.log(`Total Products: ${products.length}`.cyan.underline);

    const categories = {};
    products.forEach(p => {
      categories[p.category] = (categories[p.category] || 0) + 1;
    });

    console.log('Products by Category:'.yellow);
    console.table(categories);

    // List a few examples to check exact string matching
    console.log('Sample Categories:'.yellow);
    products.slice(0, 5).forEach(p => console.log(`- "${p.category}"`));

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

checkData();
