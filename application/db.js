var mongoose = require('mongoose');

let mongodb_connection = mongoose.connect("mongodb+srv://jadenbutelho:jaden_2001@cluster0.nq7hbub.mongodb.net/user_application", {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }).then(()=>{
    console.log('Connection Successful')
 }).catch((err)=>{
    console.log(`Error occured ${err}`)
 })

module.exports = mongodb_connection;

// mongodb+srv://jadenbutelho:<password>@cluster0.nq7hbub.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://jadenbutelho:jaden_2001@cluster0.nq7hbub.mongodb.net/user_application