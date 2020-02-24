import {
    RECEIVE_CURRENT_USER,
    RECEIVE_USER_LOGOUT,
    RECEIVE_USER_SIGN_IN
} from "../actions/session_actions";

import { RECEIVE_TRADE } from "../actions/trade_actions";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!action.currentUser,
                user: action.currentUser
            };
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: undefined
            };
        case RECEIVE_TRADE:
            const newState = { ...state }
            newState.user.cash = action.user.cash;
            return newState;
        case RECEIVE_USER_SIGN_IN:
            return {
                ...state,
                isSignedIn: true
            };
        default:
            return state;
    }
}
