
const cartService = require('../services/cart.service');

const addItemToCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;   
        const cart = await cartService.addToCart(userId, productId, quantity);
        res.status(200).json({ status: 'success', data: cart });
    } catch (error) {
       next(error);
    }
};

module.exports = { addItemToCart };