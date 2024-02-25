// Importing mongoose module 
const mongoose = require("mongoose") 

// Calling Schema class 
const Schema = mongoose.Schema; 

// Creating Structure of the collection 
const collection_structure = new Schema({ 
profile_name: { 
	type: String, 
    // default: "blank"
	require: true
} 
, 
pfp: { 
	type: String, 
	require: true 
},
bio: {
    type: String,
    default: 0
},
gallery: [{
    type: String,
    required: true
    
}],
// profile_id: {
//     // type:
// }
},
{
    timestamps: true
}) 

// Creating collection 
module.exports =  mongoose.model("user_profile", collection_structure);

