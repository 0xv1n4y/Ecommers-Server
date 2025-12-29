const Product = require('../models/product.model');

// Create a new product

const createProduct = async (data, files) => {
    const images = files.map(file => ({
        public_id: file.filename,
        url: file.path}));

    return await Product.create({ ...data, images });
};

// Get products with filters, pagination, and sorting

const getProducts = async (query) => {
    const { category, minPrice, maxPrice, page = 1, limit = 10 } = query;

    const filter = { isActive: true };

    if (category) filter.category = category;
    if (minPrice) filter.price = { $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

    const products = await Product.find(filter)
        .select('-__v')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

    return products;
};

module.exports = {  createProduct,  getProducts};