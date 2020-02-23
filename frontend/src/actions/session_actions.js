
import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const REMOVE_SESSION_ERRORS = 'REMOVE_SESSION_ERRORS';
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

export const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGN_IN
});

export const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const removeSessionErrors = () => ({
    type: REMOVE_SESSION_ERRORS
});

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const register = user => dispatch => (
    APIUtil.register(user).then(() => (
        dispatch(receiveUserSignIn())
    ), err => (
        dispatch(receiveSessionErrors(err.response.data))
    ))
);

export const signIn = user => dispatch => (
    APIUtil.signIn(user).then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded));
    })
        .catch(err => {
            dispatch(receiveSessionErrors(err.response.data));
        })
);

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    APIUtil.setAuthToken(false);
    dispatch(logoutUser());
};