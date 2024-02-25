let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let Login = new Schema (
    {
        emailId : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },


    },
    {timestamps : true}
);


module.exports = mongoose.model("USER", Login);
