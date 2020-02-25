const express = require("express");
const router = express.Router();
const passport = require('passport');

const User = require("../../models/User");
const Trade = require("../../models/Trade");
const validatePurchaseInput = require("../../validation/purchase");

router.get("/history", passport.authenticate("jwt", { session: false }), (req, res) => {
    Trade.find({ user: req.user.id })
        .sort({ date: -1 })
        .then(trades => res.json(trades))
        .catch(err => res.status(404).json({ noTradesFound: "No trades found from that user" }));
});

router.post("/purchase", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.cash < (req.body.purchasePrice * req.body.numberOfShares)) {
        return res.status(400).json({ notEnoughCash: "You do not have enough cash to make this purchase" });
    }

    const { errors, isValid } = validatePurchaseInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const newTrade = new Trade({
        user: req.user.id,
        symbol: req.body.symbol,
        purchasePrice: req.body.purchasePrice,
        numberOfShares: req.body.numberOfShares
    });

    const query = { _id: req.user.id };
    const update = {
        "$set": {
            cash: (req.user.cash - (req.body.purchasePrice * req.body.numberOfShares))
        }
    };

    User.updateOne(query, update)
        .then(() => newTrade.save())
        .then(trade => res.json({trade: trade, user: { cash: (req.user.cash - (req.body.purchasePrice * req.body.numberOfShares))}}))
        .catch(err => console.log(err));
});

module.exports = router;