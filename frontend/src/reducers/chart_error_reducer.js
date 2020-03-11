import { RECEIVE_CHART, RECEIVE_CHART_ERROR, REMOVE_CHART_ERROR, REMOVE_STOCK_ERROR, RECEIVE_STOCK } from "../actions/stock_actions";

const _nullErrors = [];

const ChartErrorReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CHART_ERROR:
            return action.error;
        case RECEIVE_CHART:
            return _nullErrors;
        case REMOVE_CHART_ERROR:
            return _nullErrors;
        case RECEIVE_STOCK:
            return _nullErrors;
        case REMOVE_STOCK_ERROR:
            return _nullErrors;
        default:
            return state;
    }
};

export default ChartErrorReducer;