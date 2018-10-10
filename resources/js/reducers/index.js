import { combineReducers } from "redux";
import LoginReducer from "./login.reducer";
import RegisterReducer from "./register.reducer";
import NotifyReducer from "./notify.reducer";
import DamageReducer from "./damage.reducer";
import UserReducer from "./user.reducer";
import UsersReducer from "./users.reducer";

/**
 * Defines the shape of the redux store.
 */
export default combineReducers({
  login: LoginReducer,
  register: RegisterReducer,
  user: UserReducer,
  users: UsersReducer,
  notify: NotifyReducer,
  damage: DamageReducer,
});
