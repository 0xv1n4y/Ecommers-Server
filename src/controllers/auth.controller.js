const authService = require('../services/auth.service');
const User = require('../models/user.Model');

//User Registration Controller
const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const {user, token} = await authService.registerUser({name, email, password});
        res.status(201).json({success: true, token,  user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};

//User Login Controller

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const {user, token} = await authService.loginUser({email, password});
        res.cookie('access_token', token, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000, });
        res.status(200).json({success: true, user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }   
};



module.exports = { register, login };