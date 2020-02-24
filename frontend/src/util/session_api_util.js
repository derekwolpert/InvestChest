import axios from "axios";

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export const register = (userData) => {
    return axios.post("/api/users/register", userData);
};

export const signIn = (userData) => {
    return axios.post("/api/users/signin", userData);
};

export const getCurrentUser = () => {
    return axios.post("/api/users/current");
};