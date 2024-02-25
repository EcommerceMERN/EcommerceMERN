// Importing mongoose module 
const mongoose = require("mongoose") 

// Calling Schema class 
const Schema = mongoose.Schema; 

// Creating Structure of the collection 
const collection_structure = new Schema({ 
    
matching_users: [{
    // type: Schema.Types.ObjectId,
    // ref: 'user_profile',
    type: String,
    default: []
}],
// follower_pics: [{
//     type: String,
//     required: true
// }],
//  user id
user_name: {
    type: String,
    default: ""
}
},
{
    timestamps: true
}) 

// Creating collection 
module.exports =  mongoose.model("user_matching", collection_structure);

