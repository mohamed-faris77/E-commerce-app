import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Products from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const checkData = async () => {
  try {
    console.log("Connecting to DB...");
    // Wait a bit for connection
    await new Promise(resolve => setTimeout(resolve, 2000));

    const products = await Products.find({});
    console.log("Total Products:", products.length);

    const categories = {};
    products.forEach(p => {
      categories[p.category] = (categories[p.category] || 0) + 1;
    });

    console.log("Categories found:", JSON.stringify(categories, null, 2));
    process.exit();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

checkData();
