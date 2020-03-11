
import { combineReducers } from "redux";

import SessionErrorsReducer from "./session_errors_reducer";
import StockErrorReducer from "./stock_error_reducer";
import ChartErrorReducer from "./chart_error_reducer";

export default combineReducers({
    session: SessionErrorsReducer,
    stock: StockErrorReducer,
    chart: ChartErrorReducer
});