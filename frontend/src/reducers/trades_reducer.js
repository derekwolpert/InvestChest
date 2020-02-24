import {
    RECEIVE_ALL_TRADES,
    RECEIVE_TRADE
} from "../actions/trade_actions";

import { RECEIVE_USER_LOGOUT } from "../actions/session_actions";

export default function(state = null, action) {
    switch (action.type) {
        case RECEIVE_ALL_TRADES:
            return action.trades;
        case RECEIVE_TRADE:
            return [action.trade, ...state];
        case RECEIVE_USER_LOGOUT:
            return null;
        default:
            return state;
    }
}
