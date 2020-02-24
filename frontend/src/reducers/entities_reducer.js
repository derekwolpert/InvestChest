import { combineReducers } from "redux";
import tradesReducer from "./trades_reducer";
// import stocksReducer from "./stocks_reducer";

const entitiesReducer = combineReducers({
    trades: tradesReducer,
});

export default entitiesReducer;