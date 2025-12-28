const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({success: false, message: 'No token provided'});
    }

    try{
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); // proceed to next middleware or route handler
    }catch(error){
        return res.status(401).json({success: false, message: 'Token is not valid'});
    }

};

module.exports = { protect };
