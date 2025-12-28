
const {body} = require('express-validator');

// Validation rules for user registration
const registerValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required') 
        .isLength({min: 2}).withMessage('Name must be at least 2 characters long'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage('Email must be a valid address'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: 6}).withMessage('Password must be at least 6 characters long')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')
        
];

// Validation rules for user login
const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'), 

    body('password')
        .notEmpty().withMessage('Password is required')
];

module.exports = { registerValidation, loginValidation };