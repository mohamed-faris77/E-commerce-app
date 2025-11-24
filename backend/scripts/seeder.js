import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Products from '../models/Product.js';
import Order from '../models/Order.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const products = [
  // Electronics
  {
    name: 'Apple MacBook Air M2',
    brand: 'Apple',
    price: 1099,
    ratings: 4.8,
    images: [{ url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Apple MacBook Air M2',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Samsung Galaxy Tab S8',
    brand: 'Samsung',
    price: 699,
    ratings: 4.7,
    images: [{ url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Samsung Galaxy Tab S8',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    brand: 'Sony',
    price: 349,
    ratings: 4.9,
    images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Sony WH-1000XM5 Headphones',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Dell XPS 13 Laptop',
    brand: 'Dell',
    price: 1299,
    ratings: 4.6,
    images: [{ url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Dell XPS 13 Laptop',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Google Nest Hub Max',
    brand: 'Google',
    price: 229,
    ratings: 4.4,
    images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Google Nest Hub Max',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Apple iPad Pro 12.9"',
    brand: 'Apple',
    price: 1099,
    ratings: 4.8,
    images: [{ url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Apple iPad Pro 12.9"',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Samsung 4K Smart TV 55"',
    brand: 'Samsung',
    price: 799,
    ratings: 4.5,
    images: [{ url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Samsung 4K Smart TV 55"',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Bose QuietComfort Earbuds',
    brand: 'Bose',
    price: 279,
    ratings: 4.7,
    images: [{ url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Bose QuietComfort Earbuds',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'HP Pavilion Gaming Laptop',
    brand: 'HP',
    price: 899,
    ratings: 4.3,
    images: [{ url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'HP Pavilion Gaming Laptop',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Amazon Echo Dot (5th Gen)',
    brand: 'Amazon',
    price: 49,
    ratings: 4.6,
    images: [{ url: 'https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Amazon Echo Dot (5th Gen)',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Apple AirPods Pro',
    brand: 'Apple',
    price: 249,
    ratings: 4.8,
    images: [{ url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Apple AirPods Pro',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Samsung Galaxy Watch 5',
    brand: 'Samsung',
    price: 279,
    ratings: 4.5,
    images: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Samsung Galaxy Watch 5',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Sony PlayStation 5',
    brand: 'Sony',
    price: 499,
    ratings: 4.9,
    images: [{ url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Sony PlayStation 5',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Lenovo ThinkPad X1 Carbon',
    brand: 'Lenovo',
    price: 1499,
    ratings: 4.7,
    images: [{ url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Lenovo ThinkPad X1 Carbon',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Google Pixel 7 Pro',
    brand: 'Google',
    price: 899,
    ratings: 4.6,
    images: [{ url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Google Pixel 7 Pro',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Apple Mac Mini M2',
    brand: 'Apple',
    price: 599,
    ratings: 4.8,
    images: [{ url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Apple Mac Mini M2',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Samsung Odyssey G9 Monitor',
    brand: 'Samsung',
    price: 1499,
    ratings: 4.4,
    images: [{ url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Samsung Odyssey G9 Monitor',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'JBL Go 3 Portable Speaker',
    brand: 'JBL',
    price: 39,
    ratings: 4.3,
    images: [{ url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'JBL Go 3 Portable Speaker',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Asus ROG Strix Gaming PC',
    brand: 'Asus',
    price: 1999,
    ratings: 4.5,
    images: [{ url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Asus ROG Strix Gaming PC',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Fitbit Charge 5',
    brand: 'Fitbit',
    price: 149,
    ratings: 4.2,
    images: [{ url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Fitbit Charge 5',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Apple Magic Keyboard',
    brand: 'Apple',
    price: 299,
    ratings: 4.7,
    images: [{ url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Apple Magic Keyboard',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Samsung Galaxy Buds 2',
    brand: 'Samsung',
    price: 149,
    ratings: 4.4,
    images: [{ url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Samsung Galaxy Buds 2',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Microsoft Surface Pro 9',
    brand: 'Microsoft',
    price: 999,
    ratings: 4.6,
    images: [{ url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Microsoft Surface Pro 9',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Sony A7R IV Camera',
    brand: 'Sony',
    price: 3499,
    ratings: 4.8,
    images: [{ url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Sony A7R IV Camera',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Google Chromecast with Google TV',
    brand: 'Google',
    price: 49,
    ratings: 4.3,
    images: [{ url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Google Chromecast with Google TV',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Apple iMac 24"',
    brand: 'Apple',
    price: 1299,
    ratings: 4.7,
    images: [{ url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Apple iMac 24"',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Samsung QLED 4K TV 65"',
    brand: 'Samsung',
    price: 1299,
    ratings: 4.5,
    images: [{ url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Samsung QLED 4K TV 65"',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Logitech MX Master 3 Mouse',
    brand: 'Logitech',
    price: 99,
    ratings: 4.6,
    images: [{ url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Logitech MX Master 3 Mouse',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Razer DeathAdder V2 Mouse',
    brand: 'Razer',
    price: 69,
    ratings: 4.4,
    images: [{ url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Razer DeathAdder V2 Mouse',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Anker PowerCore 20000 Portable Charger',
    brand: 'Anker',
    price: 59,
    ratings: 4.5,
    images: [{ url: 'https://images.unsplash.com/photo-1609592806580-9b8b3b6b6b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Electronics',
    description: 'Anker PowerCore 20000 Portable Charger',
    stock: 10,
    numOfReviews: 0,
  },

  // Kitchen & Home
  {
    name: 'Instant Pot Duo 7-in-1',
    brand: 'Instant Pot',
    price: 79,
    ratings: 4.7,
    images: [{ url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Kitchen & Home',
    description: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Ninja Professional Blender',
    brand: 'Ninja',
    price: 99,
    ratings: 4.5,
    images: [{ url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Kitchen & Home',
    description: 'Ninja Professional Blender with Nutri Ninja Cups',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'KitchenAid Stand Mixer',
    brand: 'KitchenAid',
    price: 379,
    ratings: 4.8,
    images: [{ url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Kitchen & Home',
    description: 'KitchenAid Artisan Series 5-Qt. Stand Mixer',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Cuisinart Coffee Maker',
    brand: 'Cuisinart',
    price: 149,
    ratings: 4.6,
    images: [{ url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Kitchen & Home',
    description: 'Cuisinart 14-Cup Programmable Coffeemaker',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Dyson Vacuum Cleaner',
    brand: 'Dyson',
    price: 599,
    ratings: 4.7,
    images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Kitchen & Home',
    description: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    stock: 10,
    numOfReviews: 0,
  },

  // Mobile
  {
    name: 'Samsung Galaxy S23',
    brand: 'Samsung',
    price: 799,
    ratings: 4.8,
    images: [{ url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Mobile',
    description: 'Samsung Galaxy S23 Factory Unlocked Android Smartphone',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    price: 999,
    ratings: 4.9,
    images: [{ url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Mobile',
    description: 'Apple iPhone 14 Pro, 128GB, Deep Purple',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Google Pixel 7',
    brand: 'Google',
    price: 599,
    ratings: 4.6,
    images: [{ url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Mobile',
    description: 'Google Pixel 7 - 5G Android Phone',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'OnePlus 11',
    brand: 'OnePlus',
    price: 699,
    ratings: 4.7,
    images: [{ url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Mobile',
    description: 'OnePlus 11 5G | 16GB RAM+256GB',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Xiaomi 13 Pro',
    brand: 'Xiaomi',
    price: 899,
    ratings: 4.5,
    images: [{ url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Mobile',
    description: 'Xiaomi 13 Pro 5G Smartphone',
    stock: 10,
    numOfReviews: 0,
  },

  // Fashion
  {
    name: 'Nike Air Max Sneakers',
    brand: 'Nike',
    price: 129,
    ratings: 4.7,
    images: [{ url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Fashion',
    description: 'Nike Men\'s Air Max 270 Running Shoes',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Adidas Ultraboost Shoes',
    brand: 'Adidas',
    price: 189,
    ratings: 4.8,
    images: [{ url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Fashion',
    description: 'Adidas Ultraboost 22 Running Shoes',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Levi\'s 501 Jeans',
    brand: 'Levi\'s',
    price: 89,
    ratings: 4.6,
    images: [{ url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Fashion',
    description: 'Levi\'s Men\'s 501 Original Fit Jeans',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'Zara Wool Coat',
    brand: 'Zara',
    price: 199,
    ratings: 4.5,
    images: [{ url: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Fashion',
    description: 'Zara Wool Blend Coat',
    stock: 10,
    numOfReviews: 0,
  },
  {
    name: 'H&M Cotton T-Shirt',
    brand: 'H&M',
    price: 29,
    ratings: 4.3,
    images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&q=80' }],
    category: 'Fashion',
    description: 'H&M Regular Fit Cotton T-Shirt',
    stock: 10,
    numOfReviews: 0,
  },
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Products.deleteMany();
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
      },
    ]);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Products.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Products.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
