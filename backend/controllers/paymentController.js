import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    console.log('Payment Request Amount (Raw):', amount, typeof amount);

    const amountInPaise = Math.round(Number(amount) * 100);
    console.log('Payment Request Amount (Paise):', amountInPaise);

    const options = {
      amount: amountInPaise, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: "Some error occured" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify-payment
// @access  Private
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database comes here
      // You might want to update the order status to 'Paid' here if you have the order ID

      res.json({
        message: "Payment successfull",
        success: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      });
    } else {
      res.status(400).json({
        message: "Invalid signature",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Get Razorpay Key ID
// @route   GET /api/payment/get-key
// @access  Private
export const getRazorpayKey = async (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
};
