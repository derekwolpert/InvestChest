const express = require("express");
const router = express.Router();
const axios = require("axios");
const iexApiToken = require("../../config/keys").iexApiToken;
const iexSandboxToken = require("../../config/keys").iexSandboxToken;


router.get("/batch/:symbols", (req, res) => {
    axios.get(`https://${process.env.NODE_ENV === "production" ? "cloud" : "sandbox"}.iexapis.com/stable/stock/market/batch?symbols=${req.params.symbols}&filter=symbol,companyName,latestPrice,latestUpdate,previousClose,lastTradeTime&types=quote&token=${iexApiToken}`)
        .then(stocks => res.json(stocks.data))
        .catch(err => res.status(err.response.status).json({ noStocksFound: err.response.data })
        );
});

router.get("/lookup/:symbol", (req, res) => {
    axios.get(`https://${process.env.NODE_ENV === "production" ? "cloud" : "sandbox"}.iexapis.com/stable/stock/${req.params.symbol}/quote?filter=symbol,companyName,latestPrice,latestUpdate,previousClose,lastTradeTime&token=${iexApiToken}`)
        .then(stock => res.json(stock.data))
        .catch(err => res.status(err.response.status).json({ noStockFound: err.response.data, symbol: req.params.symbol.toUpperCase() }));
});


router.get("/chart/:symbol/:range", (req, res) => {

    const rangeSubUrl = {
        "1d": "1d/?filter=date,minute,close",
        "5dm": "5dm/?filter=date,minute,close",
        "1mm": "1mm/?filter=date,minute,close",
        "3m": "3m/?filter=date,close",
        "6m": "6m/?filter=date,close",
        "1y": "1Y/?filter=date,close",
        "2y": "2y/?filter=date,close",
        "5y": "5y/?filter=date,close"
    };

    axios.get(`https://sandbox.iexapis.com/stable/stock/${req.params.symbol}/chart/${rangeSubUrl[req.params.range]}&token=${iexSandboxToken}`)
        .then(chart => res.json({ symbol: req.params.symbol, range: req.params.range, chart: chart.data }))
        .catch(err => res.status(err.response.status).json({ noChartFound: err.response.data, symbol: req.params.symbol.toUpperCase() }));
});

module.exports = router;