import axios from "axios";

export const getTrades = () => {
    return axios.get("/api/trades/history");
};

export const createTrade = data => {
    return axios.post("/api/trades/purchase", data);
};