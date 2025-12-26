const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB  = require('./config/db');
const authRoute = require('./routes/authRoute');

// Middleware to parse JSON requests
app.use(express.json());

dotenv.config();


//Health check route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Auth routes
app.use('/api/auth', authRoute);

// Connect to the database
connectDB();

const PORT = process.env.PORT || 7300;

// Server setup
app.listen(PORT, (err) => {
    if (err) {
        console.log('Failed to start server');
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});