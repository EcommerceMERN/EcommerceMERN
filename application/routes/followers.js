let model_user = require('../models/user_signup.model');
let model_profile = require('../models/user_profile.model');
let model_followers = require('../models/user_follower.model');

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

// User following others for the first time
router.post('/followerList', async function(req, res, next) {
  // res.render('index', { title: 'SignUp' });
  let follower_profile = req.body.follower_profile;
  // let pics =  req.body.pics;
  let user_followers = await model_followers.create({follower_profile});
  console.log(user_followers);
  res.json({user_followers});
});

// Follower updating after the first time
router.put('/followerList', authenticateUser, async function(req, res, next) {
  let user = req.user;
  // Here updated_list is the id of the user B that user A wants to add in followers
  let updated_list = req.body.follower_profile;
  // Get the follower list id for that specific user
  let get_user = await model_user.findOne({user_name: user.user_name}).select('followers');
  let followerID = get_user.followers;
  // Update the follower list in the follower model
  // The $push operator adds the element to the array
  let updated_follower = await model_followers.findByIdAndUpdate(followerID, {$push: {follower_profile: updated_list}});
  res.json({updated_follower});
});

router.put('/followerList/remove', authenticateUser, async function(req, res, next) {
  let user = req.user;
  // Here updated_list is the id of the user B that user A wants to remove from followers
  let updated_list = req.body.follower_profile;
  // Get the follower list id for that specific user
  let get_user = await model_user.findOne({user_name: user.user_name}).select('followers');
  let followerID = get_user.followers;
  // Update the follower list in the follower model
  // The $pull operator removes the element from the array
  let updated_follower = await model_followers.findByIdAndUpdate(followerID,{$pull: {follower_profile: updated_list}});
  res.json({updated_follower});

});

// Get the follower list for the first time and update the follower _id into the user model
router.get('/followerList', authenticateUser, async function(req, res, next) {
  let user = req.user;
  let get_user_followers = await model_followers.find();
  // Extracting The follower model id from get_user_followers
  let followerID = get_user_followers.map(follower => follower._id);
  // Add the follower list id into the user model
  await model_user.findOneAndUpdate({user_name:user.user_name}, {followers: followerID});
  res.json({get_user_followers});

});

// Delete followers
router.get('/followerList/delete', async function(req, res, next) {
    let get_user_followersDelete = await model_followers.deleteMany({follower_profile: []});
    res.json({get_user_followersDelete});
  
  });

// Protected Route to get list of all the followers of user
router.get('/protected/data/followers', authenticateUser, async function (req, res, next){
  // Accessing the authenticated user via req.user
  let user = req.user;
  let followers = await model_user.findOne({user_name: user.user_name}).select('followers').populate('followers','follower_profile');
  res.json({followersList: followers, message: 'Access granted to this protected route!'});
});

module.exports = router;
