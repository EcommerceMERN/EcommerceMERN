let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let cartCollection = new Schema (
    {
        quantity : {
            type : Number,
            default : 0,
            required : true
        },

        products : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "PRODUCT",
            default : []
        }],
        
        totalCost : {
            type : Number,
            // required : true,
            defalt : 0
        }
    },
    {timestamps : true}
);

module.exports = mongoose.model("CART", cartCollection);