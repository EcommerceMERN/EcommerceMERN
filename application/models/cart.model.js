let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let cartCollection = new Schema (
    {
        quantity : {
            type : Number,
            default : 0,
            // required : true
        },

        items : {
            type : [{
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "PRODUCT"
                },
                quantity: {
                    type: Number,
                    default: 0
                },
                totalCost: {type:Number,
                default: 0}
            }],
        },

        totalCost : {
            type : Number,
            // required : true,
            defalt : 0
        }
    },
    {timestamps : true}
);

module.exports = mongoose.model("CART", cartCollection);