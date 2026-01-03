const express = require('express');
const router = express.Router();

const { protect } = require('../middlewars/auth.middleware');
const OrderController = require('../controllers/order.controller');

// Route to place an order
router.post('/', protect, OrderController.placeOrder);

module.exports = router;