import * as APIUtil from "../util/trade_api_util";

export const RECEIVE_ALL_TRADES = "RECEIVE_ALL_TRADES";
export const RECEIVE_TRADE = "RECEIVE_TRADE";

const receiveAllTrades = trades => ({
    type: RECEIVE_ALL_TRADES,
    trades: trades.data
});

const receiveTrade = trade => ({
    type: RECEIVE_TRADE,
    trade: trade.data.trade,
    user: trade.data.user
});

export const getTrades = () => dispatch => APIUtil.getTrades()
    .then(trades =>
        dispatch(receiveAllTrades(trades))
    );

export const createTrade = trade => dispatch => APIUtil.createTrade(trade)
    .then(trade =>
        dispatch(receiveTrade(trade))
    );