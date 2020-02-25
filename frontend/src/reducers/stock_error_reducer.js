import { RECEIVE_STOCK, RECEIVE_STOCK_ERROR, REMOVE_STOCK_ERROR } from "../actions/stock_actions";

const _nullErrors = [];

const StockErrorReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_STOCK_ERROR:
            return action.error;
        case RECEIVE_STOCK:
            return _nullErrors;
        case REMOVE_STOCK_ERROR:
            return _nullErrors;
        default:
            return state;
    }
};

export default StockErrorReducer;