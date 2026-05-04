const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/product.controller');

// configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'D:/2-2568/webdev/assignment/lab8/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

// get method
router.get('/add', productController.addProductPage);
router.get('/edit/:id', productController.editProductPage);
router.get('/product/delete/:id', productController.deleteProduct);

// post method
router.post('/add', upload.single('image'), productController.addProduct);
router.post('/edit/:id', upload.single('image'), productController.editProduct);

module.exports = router;