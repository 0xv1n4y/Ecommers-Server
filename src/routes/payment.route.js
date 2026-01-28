const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/payment.controller');
const PaymentVerifyController = require('../services/payment.verify');
const { protect } = require('../middlewars/auth.middleware');   

// Route to create a payment order
router.post("/create", protect, PaymentController.createPayment);
router.post("/verify", PaymentVerifyController.verifyPaymentAndFinalizeOrder);

module.exports = router;