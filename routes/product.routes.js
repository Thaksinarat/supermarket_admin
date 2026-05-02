const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/product.controller');

// setting multer
const upload = multer({
    dest: "public/uploads",
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif') {
            cb(null, true); // allow
        } else {
            cb(new Error('Only .png, .jpeg and .gif for,at allowed'), false); //reject
        }
    }
});

// get method
router.get('/add', productController.addProductPage);

// post method
router.post('/add', upload.single('image'), productController.addProduct);

module.exports = router;