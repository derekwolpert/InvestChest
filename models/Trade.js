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
        type: Number,
        required: true
    },
    numberOfShares: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Trade = mongoose.model("trades", TradeSchema);
