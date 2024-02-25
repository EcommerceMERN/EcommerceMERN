let model_user = require('../models/user_signup.model');
let model_profile = require('../models/user_profile.model');

var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const authenticateUser = require('../authentication/authMiddleware');
const {secretKey} = require('../authentication/config');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/profile', async function(req, res, next) {
  // res.render('index', { title: 'SignUp' });
  let profile_name = req.body.profile_name;
  let pfp = req.body.pfp;
  let bio = req.body.bio;
  let gallery = req.body.gallery;
  let user_profile = await model_profile.create({profile_name,pfp,bio,gallery});
  console.log(user_profile);
  res.json({user_profile});
});

router.get('/profile/',async function(req, res, next) {
  let get_user_profile = await model_profile.find()
  res.json({get_user_profile});

});

// router.put('/profile/:id', async function(req, res, next) {
//   let id = req.params.id;
//   let update = req.body.name;
//   let get_user_profile = await model_profile.findByIdAndUpdate(id,{name: update})
//   res.json({get_user_profile});

// });

// Protected Route
router.get('/protected/data/profile', authenticateUser, async function (req, res, next){
  // Accessing the authenticated user via req.user
  let user = req.user;
  let profile = await model_user.findOne({user_name: user.user_name}).select('user_name').populate('profile_id');
  res.json({profile: profile, message: 'Access granted to this protected route!'});
});

module.exports = router;
