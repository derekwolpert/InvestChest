import * as APIUtil from "../util/stock_api_util";

export const RECEIVE_BATCH_STOCKS = "RECEIVE_BATCH_STOCKS";
export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const RECEIVE_CHART = "RECEIVE_CHART";
export const RECEIVE_STOCK_ERROR = "RECEIVE_STOCK_ERROR";
export const REMOVE_STOCK_ERROR = "REMOVE_STOCK_ERROR";
export const RECEIVE_CHART_ERROR = "RECEIVE_CHART_ERROR";
export const REMOVE_CHART_ERROR = "REMOVE_CHART_ERROR";

const receiveBatchStocks = stocks => ({
    type: RECEIVE_BATCH_STOCKS,
    stocks: stocks.data
});

const receiveStock = stock => ({
    type: RECEIVE_STOCK,
    stock: stock.data
});

const receiveChart = chart => ({
    type: RECEIVE_CHART,
    ...chart.data
});

export const receiveStockError = error => ({
    type: RECEIVE_STOCK_ERROR,
    error
});

export const removeStockError = () => ({
    type: REMOVE_STOCK_ERROR,
});

export const receiveChartError = error => ({
    type: RECEIVE_CHART_ERROR,
    error
});

export const removeChartError = () => ({
    type: REMOVE_CHART_ERROR
});

export const getStocks = stocks => dispatch =>
    APIUtil.getStocks(stocks).then(stocks =>
        dispatch(receiveBatchStocks(stocks))
    );

export const getStock = stock => dispatch =>
    APIUtil.getStock(stock).then(stock =>
        dispatch(receiveStock(stock))
    )
    .catch (err => {
        dispatch(receiveStockError(err.response.data));
    });

export const getChart = (symbol, range) => dispatch =>
    APIUtil.getChart(symbol, range).then(chart =>
        dispatch(receiveChart(chart))
    )
    .catch (err => {
        dispatch(receiveChartError(err.response.data));
    });
