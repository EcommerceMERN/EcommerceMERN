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
    let cartItem = req.body.cartItem;
    let paymentMethod = req.body.paymentMethod;
    console.log({cartItem,paymentMethod});
    let checkout_details = await model_cart.create({cartItem,paymentMethod});
    console.log(checkout_details);
    res.json({checkout_details}); 
});




module.exports = router