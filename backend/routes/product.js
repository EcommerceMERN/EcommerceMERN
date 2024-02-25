var express = require('express');
var router = express.Router();
let product_model = require('../models/product.model');

router.post('/admin', async function(req, res, next) {
    let productId = req.body.productId;
    let productName = req.body.productName;
    let productImage = req.body.productImage;
    let productDescription = req.body.productDescription;
    let productCost = req.body.productCost;
    let productDiscount = req.body.productDiscount;
    let productStock = req.body.productStock;

    console.log ({productId,productName,productDescription,productCost,productImage,productDiscount,productStock});
    let productList = await model_product.create({productId,productName,productDescription,productCost,productImage,productDiscount,productStock});
    console.log({productList});
    res.json({productList});
});

router.put('/admin', async function(req, res, next){
    let productId = req.body.productId;
    let productName = req.body.productName;
    let productImage = req.body.productImage;
    let productDescription = req.body.productDescription;
    let productCost = req.body.productCost;
    let productDiscount = req.body.productDiscount;
    let productStock = req.body.productStock;
    console.log ({productId,productName,productDescription,productCost,productImage,productDiscountproductStock});
    let updatedProducts = await product_model.findOneAndUpdate({productId:productId},{productName:productName},{productImage:productImage},{productCost:productCost},{productDescription:productDescription},{productDiscount:productDiscount},{productStock:productStock}).populate();
    console.log({updatedProducts});
    res.json({updatedProducts});
});

router.get('/admin', async function(req, res, next) {
    // res.render('Users', { title: 'Express' });
    let productList = await model_product.find();
    console.log({productList});
    res.json({productList});
});

module.exports = router;