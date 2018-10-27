import { history } from "../history";

import CreateMiddleware from "./createMiddleware";
import { LoginActionTypes, RegisterActionTypes } from "../actions";

export const AuthMiddleware = CreateMiddleware([
  {
    action: LoginActionTypes.LOGIN_SUCCESS,
    after: (store, action) => {
      localStorage.setItem("token", action.token); // TODO: create middleware for setting localStorage
      localStorage.setItem("user", JSON.stringify(action.user));
    }
  },
  {
    action: RegisterActionTypes.REGISTER_SUCCESS,
    after: (store, action) => {
      localStorage.setItem("user", JSON.stringify(action.user));
    }
  },
  {
    action: LoginActionTypes.LOGOUT,
    after: (store, action) => {
      localStorage.removeItem("token");
    }
  }
]);
