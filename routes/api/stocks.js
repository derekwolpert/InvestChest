const express = require("express");
const router = express.Router();


const axios = require("axios");
const iexApiToken = require("../../config/keys").iexApiToken;

router.get("/batch/:symbols", (req, res) => {
    axios.get(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${req.params.symbols}&filter=symbol,companyName,latestPrice,latestUpdate&types=quote&token=${iexApiToken}`)
        .then(stocks => res.json(stocks.data))
        .catch(err => res.status(err.response.status).json({ noStocksFound: err.response.data })
        );
});

router.get("/lookup/:symbol", (req, res) => {
    axios.get(`https://cloud.iexapis.com/stable/stock/${req.params.symbol}/quote?filter=symbol,companyName,latestPrice,latestUpdate&token=${iexApiToken}`)
        .then(stock => res.json(stock.data))
        .catch(err => res.status(err.response.status).json({ noStockFound: err.response.data }));
});

module.exports = router;