    const { CloudinaryStorage } = require('multer-storage-cloudinary');
    const cloudinary = require('./cloudinaryConfig.js');
    const multer = require('multer');

    const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'image', 
        allowed_formats: ['jpeg', 'jpg', 'png'],
        // transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
    });

    const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    });

    module.exports = upload;
