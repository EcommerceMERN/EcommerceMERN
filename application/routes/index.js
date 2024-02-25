let model_user = require('../models/user_signup.model');
var mongoose = require('mongoose');
var express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const authenticateUser = require('../authentication/authMiddleware');
const {secretKey} = require('../authentication/config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', async function(req, res, next) {
  // res.render('index', { title: 'SignUp' });
  let user_name = req.body.user_name;
  let password = req.body.password;
  let email = req.body.email;
  let dob = req.body.dob;
  let profile_id = req.body.profile_id;
  let user_registration = await model_user.create({user_name,password,email,dob,profile_id});
  console.log(user_registration);
  res.json({user_registration});
});

router.get('/signup', async function(req, res, next) {
  let get_user_registration = await model_user.find()
  res.json({get_user_registration});

});

router.post('/login', async function(req, res, next) {
  // const {user_name, password} = req.body;
  let user_name = req.body.user_name;
  let password = req.body.password;

  // Validating user Credentials
  if (!user_name || !password){
    return res.status(400).json({message: 'Please provide both credentials.'});
  }

  // Finding the user in the signup database
  // const user = await model_user.find(u => u.user_name === user_name && u.password === password);
  let user = await model_user.findOne({user_name: user_name, password: password});
  if (!user){
    return res.status(401).json({message: 'Invalid Credentials.'});
  }

  // Creating a JWT token
  const token = jwt.sign({user: {user_name: user.user_name, user_email: user.email, user_dob: user.dob, profile_id: user.profile_id}}, secretKey);
  console.log(token,secretKey);
  res.json({token,user:user.user_name});
});

// Protected Route
router.get('/protected/data', authenticateUser, function (req, res, next){
  // Accessing the authenticated user via req.user
  res.json({user: req.user, message: 'Access granted to this protected route!'});
});

// Reset Password
// router.post('/resetpassword', async function(req, res, next){
//   let code = await model_user.findOne({email:email});
//   res.json({code});
// });


module.exports = router;
