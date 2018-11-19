import { createStore, combineReducers, applyMiddleware } from "redux";

import LoginReducer from "./login.reducer";
import RegisterReducer from "./register.reducer";
import NotifyReducer from "./notify.reducer";
import DamageReducer from "./damage.reducer";
import UserReducer from "./user.reducer";
import UsersReducer from "./users.reducer";
import InvitesReducer from "./invites.reducer";
import TokensReducer from "./tokens.reducer";

/**
 * Defines the shape of the redux store.
 */
export default combineReducers({
  login: LoginReducer,
  register: RegisterReducer,
  user: UserReducer,
  users: UsersReducer,
  invites: InvitesReducer,
  notify: NotifyReducer,
  damage: DamageReducer,
  tokens: TokensReducer
});
