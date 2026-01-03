//Express-app initialization

const express = require('express');
const cors = require('cors');

//Importing routes
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.route');

//Importing error handling middleware
const { errorHandler } = require("./middlewars/error.middleware");

//Creating express app
const app = express();

//Middleware to parse JSON requests
app.use(express.json()); 
app.use(cors());


//Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

//Health check route
app.get('/', (req, res) => {
    res.status(200).json({succes:true, message: 'API is running' });
});

// ❗ Error middleware MUST be last
app.use(errorHandler);

module.exports = app;