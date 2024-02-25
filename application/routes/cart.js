let model_user = require('../models/user_signup.model');
let model_cart = require('../models/cart.model');
var mongoose = require('mongoose');
var express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const authenticateUser = require('../authentication/authMiddleware');
const {secretKey} = require('../authentication/config');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('respond with a cart');
  });

router.post('/', async function (req, res, next){
    let quantity = req.body.quantity;
    let products = req.body.products;
    let totalCost = req.body.totalCost;
    console.log({quantity,products,totalCost});
    let cart_details = await model_cart.create({quantity,products,totalCost});
    console.log(cart_details);
    res.json({cart_details}); 
});


module.exports = router