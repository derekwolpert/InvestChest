const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    symbol: {
        type: String,
        required: true
    },
    purchasePrice: {
        type: String,
        required: true
    },
    numberOfShares: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Trade = mongoose.model("trades", TradeSchema);
