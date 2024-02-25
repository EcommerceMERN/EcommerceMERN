let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userCollection = new Schema (
    {
        username : {
            type : String,
            required : true
        },

        password : {
            type : String,
            required : true
        },

        emailId : {
            type : String,
            required : true
        },

        phoneNo : {
            type : Number,
            required : true
        },

        address1 : {
            type : String,
            required : false
        },

        address2 : {
            type : String,
            required : false,
            default : false
        },

        isAdmin : {
            type : Boolean,
            default : false
        },
        cart : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'CART',
            default: {}
        }]
    },
    {timestamps : true}
);

module.exports = mongoose.model("USER", userCollection);