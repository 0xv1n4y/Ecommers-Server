const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const upload = require('../middlewars/upload.middleware');
const { protect } = require('../middlewars/auth.middleware');
const isAdmin = require('../middlewars/admin.middleware');

// Route to create a new product with image uploads
router.post('/', protect, isAdmin, upload.array('images', 5), ProductController.createProduct);

// Route to get products with optional filters, pagination, and sorting
router.get('/', ProductController.getProducts);

module.exports = router;