import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, authorizeRoles('admin'), getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, authorizeRoles('admin'), updateOrderToDelivered);

export default router;
