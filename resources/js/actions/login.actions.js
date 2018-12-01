import { NotifyActions } from "./notify.actions";
import { history } from "../history";

export const LoginActionTypes = {
  LOGIN_ATTEMPT: "login_attempt",
  LOGIN_SUCCESS: "login_success",
  LOGIN_FAILURE: "login_failure",
  LOGOUT: "logout"
};

export const LoginActions = {
  attempt: () => {
    return { type: LoginActionTypes.LOGIN_ATTEMPT };
  },
  success: (token, user) => {
    return { type: LoginActionTypes.LOGIN_SUCCESS, token: token, user: user };
  },
  failure: () => {
    return { type: LoginActionTypes.LOGIN_FAILURE };
  },
  logout: () => {
    return { type: LoginActionTypes.LOGOUT };
  }
};

/**
 * Returns a login method that dispatches redux actions. Delegates login request to authService
 * @param {AuthService} authService must have a login(email: string, password: string) method
 * @param {function} dispatch the redux dispatch method
 * @returns a login method that dispatches redux actions
 */
export const CreateLoginActionDispatcher = (authService, dispatch) => {
  return (email, password) => {
    dispatch(LoginActions.attempt());

    authService
      .login(email, password)
      .then(response => {
        dispatch(LoginActions.success(response.access_token, response.user));
      })
      .catch(error => {
        dispatch(LoginActions.failure());
        dispatch(NotifyActions.error(error));
      });
  };
};

/**
 * Returns a logout method that dispatches redux actions. Delegates logout authService
 * @param {AuthService} authService must have a logout() method
 * @param {function} dispatch the redux dispatch method
 * @returns a login method that dispatches redux actions
 */
export const CreateLogoutActionDispatcher = (authService, dispatch) => {
  return () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
};
