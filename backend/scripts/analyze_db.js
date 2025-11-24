import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Products from '../models/Product.js';
import connectDB from '../config/db.js';

dotenv.config();

const analyzeDatabase = async () => {
  try {
    await connectDB();

    // Wait for connection
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('\n========================================');
    console.log('DATABASE ANALYSIS');
    console.log('========================================\n');

    const allProducts = await Products.find({});
    console.log(`Total products in database: ${allProducts.length}\n`);

    // Group by category
    const byCategory = {};
    allProducts.forEach(p => {
      const cat = p.category || 'NO_CATEGORY';
      if (!byCategory[cat]) {
        byCategory[cat] = [];
      }
      byCategory[cat].push({
        name: p.name,
        brand: p.brand,
        price: p.price
      });
    });

    console.log('PRODUCTS BY CATEGORY:');
    console.log('========================================\n');

    Object.keys(byCategory).forEach(cat => {
      console.log(`\n📦 ${cat} (${byCategory[cat].length} products):`);
      console.log('----------------------------------------');
      byCategory[cat].forEach((p, idx) => {
        console.log(`${idx + 1}. ${p.name} - $${p.price} (${p.brand})`);
      });
    });

    console.log('\n\n========================================');
    console.log('TESTING CATEGORY QUERIES');
    console.log('========================================\n');

    // Test exact queries that frontend will use
    const categories = ['Electronics', 'Mobile', 'Kitchen & Home', 'Fashion'];

    for (const cat of categories) {
      const results = await Products.find({ category: cat });
      console.log(`\nQuery: { category: "${cat}" }`);
      console.log(`Results: ${results.length} products`);
      if (results.length > 0) {
        console.log('Sample products:');
        results.slice(0, 3).forEach(p => {
          console.log(`  - ${p.name}`);
        });
      } else {
        console.log('  ⚠️  NO PRODUCTS FOUND!');
      }
    }

    console.log('\n========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

analyzeDatabase();
