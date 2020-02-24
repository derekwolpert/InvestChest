import { combineReducers } from "redux";
import session from "./session_reducer";
import ui from "./ui_reducer";
import errors from "./errors_reducer";
import entities from "./entities_reducer";

const rootReducer = combineReducers({
    entities,
    session,
    ui,
    errors
});

export default rootReducer;