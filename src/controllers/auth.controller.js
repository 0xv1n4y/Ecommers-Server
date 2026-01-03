const authService = require('../services/auth.service');

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
        res.status(200).json({success: true, token, user: {
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