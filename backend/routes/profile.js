var express = require('express');
var router = express.Router();
let model = require('../models/product.model');
let user_model = require('../models/user.model');
let authenticateUser = require('../auth/authentication');


/* GET users listing. */
router.get('/user', authenticateUser, async function(req, res, next) {
  // res.send('respond with a resource');
  let user = req.user;
  let user_profile = await user_model.findOne({username:user.username});
  res.json({user_profile});
});




module.exports = router;
