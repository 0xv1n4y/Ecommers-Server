const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cart.controller');
const { protect } = require('../middlewars/auth.middleware');   

// Route to add item to cart
router.post('/add', protect, CartController.addItemToCart);

module.exports = router;