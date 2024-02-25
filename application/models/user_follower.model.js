// Importing mongoose module 
const mongoose = require("mongoose") 

// Calling Schema class 
const Schema = mongoose.Schema; 

// Creating Structure of the collection 
const collection_structure = new Schema({ 
    
follower_profile: [{
    type: Schema.Types.ObjectId,
    ref: 'user_profile',
    default : null
    // type: String,
    // require: true
}],
// follower_pics: [{
//     type: String,
//     required: true
// }],
//  user id
// user_id: {}
},
{
    timestamps: true
}) 

// Creating collection 
module.exports =  mongoose.model("user_follower", collection_structure);

