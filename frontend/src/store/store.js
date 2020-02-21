import { createStore, applyMiddleware } from "redux";
import thunk from "../middleware/thunk";
import logger from "redux-logger";

import rootReducer from "../reducers/root_reducer";

const configureStore = (preloadedState = {}) =>
    createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));

export default configureStore;