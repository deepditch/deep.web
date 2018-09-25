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
  success: token => {
    return { type: LoginActionTypes.LOGIN_SUCCESS, token: token };
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
 * @param {AuthService} authService must have a login method : login(email, password)
 * @param {function} dispatch the redux dispatch method
 * @returns a login method that dispatches redux actions
 */
export const CreateLoginActionDispatcher = (authService, dispatch) => {
  return (email, password) => {
    authService
      .login(email, password)
      .then(response => {
        dispatch(NotifyActions.success("You have successfully logged in"));
        dispatch(LoginActions.success(response.access_token));
        history.push("/");
      })
      .catch(error => {
        dispatch(NotifyActions.error("Login failure"));
        dispatch(LoginActions.failure());
      });
  };
};

/**
 * Returns a logout method that dispatches redux actions. Delegates logout authService
 * @param {AuthService} authService must have a login method : login(email, password)
 * @param {function} dispatch the redux dispatch method
 * @returns a login method that dispatches redux actions
 */
export const CreateLogoutActionDispatcher = (authService, dispatch) => {
  return () => {
    authService.logout();
    dispatch(LoginActions.logout());
    dispatch(NotifyActions.default("You have been logged out"));
    history.push("/login");
  };
};
