import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";

const usersManagementApp = combineReducers({
  users: userReducer,
  errors: errorReducer,
});

export default usersManagementApp;
