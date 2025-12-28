
require("dotenv").config();
const app = require('./src/app');
const connectDB = require('./src/config/db');


const PORT = process.env.PORT || 3000;

// Connect Database FIRST
connectDB();

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Failed to start server on port ${PORT}`);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});