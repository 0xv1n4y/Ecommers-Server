const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true // for faster search
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true, 
        min: 0,
        index: true // for price range queries
    },
    category: {
        type: String,   
        required: true,
        index: true // for category-based queries
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true,  

    }
}, { timestamps: true }) ;

//Compound index for category and price
productSchema.index({ category:1, price:1 }); 

module.exports = mongoose.model('Product', productSchema )   

