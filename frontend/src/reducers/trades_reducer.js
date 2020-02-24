import {
    RECEIVE_ALL_TRADES,
    RECEIVE_TRADE
} from "../actions/trades_action";

export default function(state = null, action) {
    switch (action.type) {
        case RECEIVE_ALL_TRADES:
            return action.trades;
        case RECEIVE_TRADE:
            return [action.trade, ...state];
        default:
            return state;
    }
}
