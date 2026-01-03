const orderService = require('../services/order.service');

const placeOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const order = await orderService.placeOrder(userId);

        res.status(201).json({ status: 'success', message: 'Order placed successfully', data: order });
    }
    catch (error) {
        next(error);
    }
};

module.exports = { placeOrder };