let mongoose = require('mongoose');
let schema = mongoose.Schema;

let checkoutCollection = new Schema ({
    cartItem : {
        type : Schema.types.ObjectId,
        ref : "CART"
    },

    

});

