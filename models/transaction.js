const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    Item_name: String,
Items_sold: Number,
Total_price: Number,
Date_created: {
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model("Transaction", TransactionSchema);