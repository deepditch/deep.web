import { combineReducers } from "redux";
import LoginReducer from "./login.reducer";
import RegisterReducer from "./register.reducer";
import NotifyReducer from "./notify.reducer";

export default combineReducers({
  login: LoginReducer,
  register: RegisterReducer,
  notify: NotifyReducer
});
