import * as APIUtil from "../util/stock_api_util";

export const RECEIVE_BATCH_STOCKS = "RECEIVE_BATCH_STOCKS";
export const RECEIVE_STOCK = "RECEIVE_STOCK";

const receiveBatchStocks = stocks => ({
    type: RECEIVE_BATCH_STOCKS,
    stocks: stocks.data
});

const receiveStock = stock => ({
    type: RECEIVE_STOCK,
    stock: stock.data
});

export const getStocks = stocks => dispatch =>
    APIUtil.getStocks(stocks).then(stocks =>
        dispatch(receiveBatchStocks(stocks))
    );

export const getStock = stock => dispatch =>
    APIUtil.getStock(stock).then(stock =>
        dispatch(receiveStock(stock))
    );