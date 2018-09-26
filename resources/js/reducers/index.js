import { combineReducers } from "redux";
import LoginReducer from "./login.reducer";
import RegisterReducer from "./register.reducer";
import NotifyReducer from "./notify.reducer";
import DamageReducer from "./damage.reducer";

/**
 * Defines the shape of the redux store.
 */
export default combineReducers({
  login: LoginReducer,
  register: RegisterReducer,
  notify: NotifyReducer,
  damage: DamageReducer
});
