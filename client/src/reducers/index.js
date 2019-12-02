import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import chatReducer from "./chatReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  chat: chatReducer
});
