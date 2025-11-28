// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, getCurrentUser, updateCurrentUser } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser);

// GET /api/auth/me (protected) - returns user profile
router.get('/me', protect, getCurrentUser);
router.put('/me', protect, updateCurrentUser);

export default router;
