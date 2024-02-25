var express = require('express');
var router = express.Router();
let model_product = require('../models/product.model');
const authenticateUser = require('../authentication/authMiddleware');

router.post('/addProduct', authenticateUser,async function(req, res, next) {
    let productId = req.body.productId;
    let productName = req.body.productName;
    let productImage = req.body.productImage;
    let productDescription = req.body.productDescription;
    let productCost = req.body.productCost;
    console.log ({productId,productName,productDescription,productCost,productImage});
    let productList = await model_product.create({productId,productName,productDescription,productCost,productImage});
    console.log({productList});
    res.json({productList});
})

router.get('/addProduct', authenticateUser,async function(req, res, next) {
    // res.render('Users', { title: 'Express' });
    let productList = await model_product.find();
    console.log({productList});
    res.json({productList});
});

module.exports = router;