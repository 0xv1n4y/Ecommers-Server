const paymentService = require("../services/payment.service");

const createPayment = async(req, res, next) => {

    try {
        const { orderId } = req.body;

        const razorpayOrder = await paymentService.createRazorpayOrder(orderId);

        res.status(201).json({
            success: true,
            razorpayOrder,
            Key: process.env.RAZORPAY_KEY_ID
        }); 
    }catch (error) {
        next(error);
    }

}

module.exports = { createPayment };