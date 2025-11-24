import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, authorizeRoles('admin'), createProduct);
router
  .route('/:id')
  .get(getProductById)
  .put(protect, authorizeRoles('admin'), updateProduct)
  .delete(protect, authorizeRoles('admin'), deleteProduct);

export default router;
