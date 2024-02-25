var express = require('express');
var router = express.Router();
let product_model = require('../models/product.model');
let user_model = require('../models/user.model');
let cart_model = require('../models/cart.model');
let authenticateUser = require('../authentication/authentication');
let mongoose = require('mongoose');

/* GET users listing. */
router.get('/user', authenticateUser, async function(req, res, next) {
  // res.send('respond with a resource');
  let user = req.user;
  let user_profile = await user_model.findOne({username:user.username});
  res.json({user_profile});
});

// router.post('/cart', async function(req, res, next) {   
//     addToCart = await cart_model.create.findOne({productId: productId}).populate();
//     console.log({addToCart});
//     res.json({addToCart});
// });

// router.put('/cart', async function(req, res, next) {   
//   updateCart = await cart_model.updateMany();
//   console.log({updateCart});
//   res.json({updateCart});
// });

// router.get('/cart', async function(req, res, next) {
//   cartItems = await cart_model.create.find();
//   console.log({cartItems});
//   res.json(cartItems);
// });

module.exports = router;