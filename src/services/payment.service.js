const razorpay = require("../config/razorpay");
const Order = require("../models/order.model");

const createRazorpayOrder = async (orderId) => {
   
    const order = await Order.findById(orderId);

    if (!order) {
        throw new Error("Order not found");
    }

    const razorpayOrder = await razorpay.orders.create({
        amount: order.totalAmount * 100, // Amount in paise
        currency: "INR",
        receipt: order._id.toString(),
    });

    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    return razorpayOrder;

};

module.exports = { createRazorpayOrder };