const Cart = require('../models/cart.model');


const addToCart = async(userId, productId, quantity) => {

    let cart = await Cart.findOne({ user: userId });

    if(!cart){
        cart = await Cart.create({
            user: userId,
            items: [{ product: productId, quantity }]
        });
        return cart;
    }else{
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

        if(itemIndex > -1){
            cart.items[itemIndex].quantity += quantity;
        }else{
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        return cart;
}

}

module.exports = { addToCart};