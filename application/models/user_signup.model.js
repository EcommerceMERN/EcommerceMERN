// Importing mongoose module 
const mongoose = require("mongoose") 

// Calling Schema class 
const Schema = mongoose.Schema; 

// Creating Structure of the collection 
const collection_structure = new Schema({ 
user_name: { 
	type: String, 
	require: true
} 
, 
password: { 
	type: String, 
	require: true 
},
dob: {
    type: Date,
    default: 0
},
email: {
    type: String,
    required: true
    
},
profile_id: {
    type: Schema.Types.ObjectId,
    ref: 'user_profile'
},
followers: {
    type: Schema.Types.ObjectId,
    ref: 'user_follower',
    default: null
},
matched_users: {
    type: Schema.Types.ObjectId,
    ref: 'user_matching',
    default: null
}
// followers: [{
//     type: String,
    
// }]
},
{
    timestamps: true
}) 

// Creating collection 
module.exports =  mongoose.model("user_signup", collection_structure);

