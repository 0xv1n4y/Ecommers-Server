const ProductService = require('../services/product.service');

// Create a new product
const createProduct = async (req, res, next) => {
    try {
        const product = await ProductService.createProduct(req.body, req.files);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// Get products with filters, pagination, and sorting
const getProducts = async (req, res) => {
    try {
        const products = await ProductService.getProducts(req.query);
        res.status(200).json({ success: true, data: products , count: products.length});
    } catch (error) {
        next(error);
    }
};  

module.exports = { createProduct, getProducts };