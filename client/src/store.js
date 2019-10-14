import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";

const initialState = {};

const logger = createLogger({
  duration: true,
  timestape: true,
  collapsed: true
});

const middleware = [thunk, logger];

let store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// if (process.env.NODE_ENV === "production") {
//   store = createStore(
//     rootReducer,
//     initialState,
//     applyMiddleware(...middleware)
//   );
// }

export default store;
