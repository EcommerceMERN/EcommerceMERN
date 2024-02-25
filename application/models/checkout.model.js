let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let checkoutCollection = new Schema (
    {
        cartItem : {
            type : Schema.Types.ObjectId,
            ref: "CART",
            default : null,
            // required : true
        },

        paymentMethod:[{
            type: String,
            default: "UPI"
        }]

        // products : [{
        //     type : Schema.Types.ObjectId,
        //     ref : "PRODUCT",
        //     default : []
        // }],

        // totalCost : {
        //     type : Number,
        //     // required : true,
        //     defalt : 0
        // }
    },
    {timestamps : true}
);

module.exports = mongoose.model("CHECKOUT", checkoutCollection);