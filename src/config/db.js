const mongoose = require('mongoose');  

const connectDB = async () => {
    try {
       const connect =  await mongoose.connect(process.env.MONGO_URI, {autoIndex: true});
        console.log(`✅ MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // stop app if DB fails
    }   
};    

module.exports = connectDB;