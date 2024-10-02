const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig')

const {AddProduct, DeleteProduct, GetAllProducts} = require('../controller/Product')

router.post('/addProduct',upload.single('image'), AddProduct)
router.delete('/deleteProduct/:id',DeleteProduct    )
router.get('/getProduct',GetAllProducts)

module.exports = router