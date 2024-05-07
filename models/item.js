const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
name: String,
quantity: Number,
price: Number,
date_created: {
    type: Date,
    default: Date.now
}

});

module.exports = mongoose.model("Item", ItemSchema);