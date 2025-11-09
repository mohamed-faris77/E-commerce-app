// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // update for your frontend origin
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);

// a sample protected admin route
import { protect, authorizeRoles } from './middleware/auth.js';
app.get('/api/admin-only', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin.' });
});

// health
app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
