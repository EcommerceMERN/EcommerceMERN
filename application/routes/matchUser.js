let model_user = require('../models/user_signup.model');
// let model_profile = require('../models/user_profile.model');
// let model_followers = require('../models/user_follower.model');
let model_matchUsers = require('../models/user_matching.model');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const authenticateUser = require('../authentication/authMiddleware');
const {secretKey} = require('../authentication/config');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Matching User!!');
});

/*
1. Get the Ids of matching user by birth year
2. Create the model with arrray of those user IDs
3. Use Put to update the array when user wishes to add new users 
 */

// 1. Get the Ids of matching user by birth year
const findUsersByBirthYear = async (birthYear) => {
    const users = await model_user.aggregate([
        {
            $match: {
                $expr: {
                    $eq: [{ $year: '$dob' }, birthYear]
                }
            }
        }
    ]);   
    console.log(users);
    return users;
};

// findUsersByBirthYear(2001);
console.log("Here");
// 2. Get the user details from the jwt token split it and then pass it in the above function

// User matched with others for the first time
// CALL ONLY WHEN USER MATCHING FOR THE FIRST TIME
router.post('/matches', authenticateUser,async function(req, res, next) {
  // res.render('index', { title: 'SignUp' });
  console.log("request arrived");
  let user = req.user;
  // let birthYear = user.dob.$year;
  let birthYear = (new Date(user.user_dob)).getFullYear();
  console.log(birthYear);
  /**
  *This line of code creates a new Date object by parsing the user_dob property of the user object and then extracts the year from that Date object. Here's a step-by-step explanation:
  *1.Access user_dob property:
  * user.user_dob: This assumes that the user object has a property named user_dob, which represents the date of birth. For example, if user looks like { user_dob: '1990-05-15' }, it contains a string representation of the date.
  *2.Create a Date Object:
  * 3.new Date(user.user_dob): This creates a new Date object by parsing the date string provided in user_dob. The resulting Date object represents the specified date and time.
  *Extract the Year:
  * .getFullYear(): This method is called on the Date object and returns the year (four digits) of the date. For example, if the Date object represents May 15, 1990, then getYear() will return 1990.
  *So, the overall purpose of this code is to extract the birth year from the user_dob property of the user object. The variable birthYear will contain the year as a four-digit number (e.g., 1990).
  */
  // Getting all the users with same birth year and extracting their ids
  let matching_users = (await findUsersByBirthYear(birthYear)).filter(item => item.user_name != user.user_name).map(user => user._id);
  let user_name = user.user_name;
  let user_matches = await model_matchUsers.create({matching_users,user_name});
  console.log(user_matches);
  res.json({user_matches});
});

// Follower updating after the first time
router.put('/matches', authenticateUser, async function(req, res, next) {
  let user = req.user;
  // Extract the birth year
  let birthYear = (new Date(user.user_dob)).getFullYear();
  console.log(birthYear);
  // Adding new users with same birth year and extracting the ids
  let matching_updated = (await findUsersByBirthYear(birthYear)).filter(item => item.user_name != user.user_name).map(user => user._id);
  // Get the matched users list id for that specific user
  let get_user = await model_user.findOne({user_name: user.user_name}).select('matched_users');
  let matchedUserID = get_user.matched_users;
  // Get the user name
  // let user_name = await model_user.findOne({user_name: user.user_name})
  // Update the follower list in the follower model
  let updated_matchedUsers = await model_matchUsers.findByIdAndUpdate(matchedUserID, {matching_users: matching_updated, user_name: user.user_name});
  res.json({updated_matchedUsers});
});

// Get the matched user list for the first time and update the matched user list _id into the user model
router.get('/matches', authenticateUser, async function(req, res, next) {
  let user = req.user;
  let get_user_matches = await model_matchUsers.findOne({user_name: user.user_name});
  // Extracting The matched user model id from get_user_matches
  let matchedUserID = get_user_matches._id;
  console.log(matchedUserID);
  // Add the matched user list id into the user model
  await model_user.findOneAndUpdate({user_name:user.user_name}, {matched_users: matchedUserID});
  res.json({get_user_matches});

});

// // Delete followers
// router.get('/followerList/delete', async function(req, res, next) {
//     let get_user_followersDelete = await model_followers.deleteMany({follower_profile: []});
//     res.json({get_user_followersDelete});
  
//   });

// Protected Route to get list of all the matches of user
router.get('/protected/data/matchedList', authenticateUser, async function (req, res, next){
  // Accessing the authenticated user via req.user
  let user = req.user;
  let matched_users = await model_user.findOne({user_name: user.user_name}).select('user_name matched_users').populate('matched_users','matching_users');
  res.json({matchedUsersList: matched_users, message: 'Access granted to this protected route!'});
});

module.exports = router;
