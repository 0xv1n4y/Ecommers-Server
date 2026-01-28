const crypto = require("crypto");
const mongoose = require("mongoose");

const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");


const verifyPaymentAndFinalizeOrder  = async (paymentDetails) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, } = paymentDetails;

    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {
        throw new Error("Payment verification failed");
    }

    //PAYMMENT IS CONFIRMED

    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        //Find the order using razorpay_order_id
        const order = await Order.findOne({ razorpayOrderId: razorpay_order_id }).populate("items.product").session(session);

        for(const item of order.items){
            const product = await Product.findById(item.product._id).session(session);

            if(!product || product.stock < item.quantity){
                throw new Error(`Product ${item.product.name} is out of stock or insufficient quantity`);
            }

            product.stock -= item.quantity; //Deduct stock

            await product.save({ session }); //Save product changes
        }
        order.paymentStatus = "Paid";

        order.razorpayPaymentId = razorpay_payment_id;

        await order.save({ session });

        await Cart.deleteOne({ user: order.user }).session(session); //Clear cart

        await session.commitTransaction();
        session.endSession();
        return order;

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        throw error;
    }   

}

module.exports = { verifyPaymentAndFinalizeOrder };

