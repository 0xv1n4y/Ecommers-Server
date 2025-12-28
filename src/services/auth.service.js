const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.Model');  
require("dotenv").config(); 


// Helper to generate JWT
const generateToken = (user) => {
    return jwt.sign(
        {id: user._id, email: user.email, role: user.role}, 
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );
};


// Register a new user
const registerUser = async ({name, email, password}) => {
    // Check if user already exists
    const existingUser = await User.findOne({email:email});
    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = generateToken(user);

    return {user, token};
};

const loginUser = async ({email, password}) => {
    const user = await User.findOne({email}).select('+password');
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken(user);

    return {user, token};
};

module.exports = { registerUser, loginUser};