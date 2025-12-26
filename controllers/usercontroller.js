const User = require('../models/userModel');

// Create a new user

const Signup = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, password, role });

        //Check if user already exists
        const existingUser = await User.findOne({email})

        if(!existingUser){
            await user.save();
            res.status(201).json({ message: 'User created successfully', user });

        }else{
            return res.status(400).json({message: 'User already exists'});

        }
    }catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


module.exports = Signup;