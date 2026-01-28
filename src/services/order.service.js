const mongoose = require('mongoose');

const Cart = require('../models/cart.model');
const Order = require('../models/order.model');


const createOrderFromCart = async(userId) => {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if(!cart || cart.items.length === 0){
        throw new Error('Cart is empty');
    }

    let total = 0;  
    
   const items = cart.items.map((item) => {
    if(item.product.stock < item.quantity){
        throw new Error("Insufficient stock");
   }
    total += item.product.price * item.quantity;
    return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
    };
   });

   const order = await Order.create({
    user: userId,
    items: items,
    totalAmount: total,
    paymentStatus: "Pending",
   });

    return order;

}

module.exports = { createOrderFromCart };

