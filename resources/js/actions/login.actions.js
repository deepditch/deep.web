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
        var user = {
          email: email,
          organization: "Test Organization"
        };

        var token = response.access_token;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch(NotifyActions.success("You have successfully logged in"));
        dispatch(LoginActions.success(token, user));
        history.push("/");
      })
      .catch(error => {
        dispatch(NotifyActions.error("Login failure"));
        dispatch(LoginActions.failure());
        console.error(error);
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
    authService.logout();
    dispatch(LoginActions.logout());
    dispatch(NotifyActions.default("You have been logged out"));
    history.push("/login");
  };
};
