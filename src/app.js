//Express-app initialization

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

const { errorHandler } = require("./middlewars/error.middleware");


const app = express();

//Middleware to parse JSON requests
app.use(express.json()); 
app.use(cors());


//Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

//Health check route
app.get('/', (req, res) => {
    res.status(200).json({succes:true, message: 'API is running' });
});

// ❗ Error middleware MUST be last
app.use(errorHandler);

module.exports = app;