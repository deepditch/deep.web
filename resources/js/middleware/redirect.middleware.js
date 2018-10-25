import { history } from "../history";

import CreateMiddleware from "./createMiddleware";
import { RegisterActionTypes, LoginActionTypes } from "../actions";

export const RedirectMiddleware = CreateMiddleware([
  {
    action: LoginActionTypes.LOGIN_SUCCESS,
    after: (store, action) => {
      history.push("/");
    }
  },
  {
    action: RegisterActionTypes.REGISTER_SUCCESS,
    after: (store, action) => {
      history.push("/login");
    }
  },
  {
    action: LoginActionTypes.LOGOUT,
    after: (store, action) => {
      history.push("/login");
    }
  }
]);
