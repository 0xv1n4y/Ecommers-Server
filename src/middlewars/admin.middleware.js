
const User = require('../models/user.Model');

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
    
        const user = await User.findById(req.user.id); // Assuming req.userId is set after authentication

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }   

        if (user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
        }

        next(); // User is admin, proceed to the next middleware/route handler
    }

module.exports =  isAdmin ;