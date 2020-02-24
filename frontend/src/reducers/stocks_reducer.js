import { RECEIVE_BATCH_STOCKS, RECEIVE_STOCK } from "../actions/stock_actions";
import { RECEIVE_USER_LOGOUT } from "../actions/session_actions";

export default function(state = null, action) {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_BATCH_STOCKS:
            return action.stocks;
        case RECEIVE_STOCK:
            return {...state, [action.stock.symbol]: action.stock};
        case RECEIVE_USER_LOGOUT:
            return null;
        default:
            return state;
    }
}