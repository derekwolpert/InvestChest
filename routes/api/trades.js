const express = require("express");
const router = express.Router();
const passport = require('passport');

const Trade = require("../../models/Trade");
const validatePurchaseInput = require("../../validation/purchase");

router.get("/history", passport.authenticate("jwt", { session: false }), (req, res) => {
    Trade.find({ user: req.user.id })
        .sort({ date: -1 })
        .then(trades => res.json(trades))
        .catch(err => res.status(404).json({ noTradesFound: "No trades found from that user" }));
});

router.post("/purchase", passport.authenticate("jwt", { session: false }), (req, res) => {

    const { errors, isValid } = validatePurchaseInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const newTrade = new Trade({
        user: req.user.id,
        symbol: req.body.symbol,
        purchasePrice: req.body.purchasePrice,
        numberOfShares: req.body.numberOfShares
    });

    newTrade.save()
        .then(trade => res.json(trade))
        .catch(err => console.log(err));

});

module.exports = router;