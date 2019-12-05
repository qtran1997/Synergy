import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import layoutReducer from "./layoutReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  layout: layoutReducer
});
