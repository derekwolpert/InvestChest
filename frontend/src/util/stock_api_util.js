import axios from "axios";

export const getStocks = symbols => {
    return axios.get(`/api/stocks/batch/${symbols}`);
};

export const getStock = symbol => {
    return axios.get(`/api/stocks/lookup/${symbol}`);
};

export const getChart = (symbol, range) => {
    return axios.get(`/api/stocks/chart/${symbol}/${range}`);
};