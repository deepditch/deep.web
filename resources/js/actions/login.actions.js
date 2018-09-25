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
  success: user => {
    return { type: LoginActionTypes.LOGIN_SUCCESS, user: user };
  },
  failure: () => {
    return { type: LoginActionTypes.LOGIN_FAILURE };
  }
};

/**
 * Create a login method that dispatches redux actions. Delegates login request to authService
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
        dispatch(LoginActions.success(response));
        history.push("/");
      })
      .catch(error => {
        dispatch(NotifyActions.error("Login failure"));
        dispatch(LoginActions.failure());
      });
  };
};
