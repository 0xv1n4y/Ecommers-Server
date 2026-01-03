const mongoose = require('mongoose');

const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');

const placeOrder = async(userId) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try{
        //Fetch user's cart
        const cart = await Cart.findOne({ user: userId }).populate('items.product').session(session);

        if(!cart || cart.items.length === 0){
            throw new Error('Cart is empty');
        }

        let total = 0;

        const orderItems = [];
        
        //Check product availability and calculate total
        for(const item of cart.items){
            const product = await Product.findById(item.product._id).session(session);

            if(!product || product.stock < item.quantity){
                throw new Error(`Product ${item.product.name} is out of stock or insufficient quantity`);
            }

            product.stock -= item.quantity; //Deduct stock
            await product.save({ session }); //Save product changes

            total += product.price * item.quantity;  //Calculate total price

            orderItems.push({  //Prepare order items
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }
        

        const order = await Order.create(
            [
                {
                    user: userId,
                    items: orderItems,
                    totalAmount: total
                }
            ],{ session }
        )

        await Cart.deleteOne({ user: userId }).session(session); //Clear cart

        await session.commitTransaction();
        session.endSession();
        return order[0];

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        throw error;
    }

}

module.exports = { placeOrder };

