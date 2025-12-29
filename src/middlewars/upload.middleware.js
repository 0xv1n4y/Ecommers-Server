const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {   
        folder: 'ecommerce/products',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif', "webp"]
    },
});

const upload = multer({
    storage,
    limits: { files: 5 }  // max 5 images
});

module.exports = upload;