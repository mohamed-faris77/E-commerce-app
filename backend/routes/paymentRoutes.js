import express from 'express';
import { createPaymentOrder, verifyPayment, getRazorpayKey } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-order', protect, createPaymentOrder);
router.post('/verify-payment', protect, verifyPayment);
router.get('/get-key', protect, getRazorpayKey);

export default router;
