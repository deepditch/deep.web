import { NotifyActions } from "./notify.actions";

export const LoginActionTypes = {
  LOGIN_SUCCESS: "login_success",
  LOGIN_FAILURE: "login_failure",
  LOGIN_ATTEMPT: "login_attempt",
  LOGOUT: "logout"
};

export const LoginActions = {
  attempt: () => {
    return { type: LoginActionTypes.LOGIN_ATTEMPT };
  },
  success: (user) => {
    return { type: LoginActionTypes.LOGIN_SUCCESS, user: user };
  },
  failure: () => {
    return { type: LoginActionTypes.LOGIN_FAILURE };
  }
};

export const LoginActionDispatcher = (authService, dispatch) => {
  return (email, password) => {
    dispatch(LoginActions.attempt());

    authService.login(email, password).then(
      response => {
        dispatch(NotifyActions.success("You have successfully logged in"));
        dispatch(LoginActions.success(response));
      },
      error => {
        dispatch(NotifyActions.error("Login failure"));
        dispatch(LoginActions.failure());
      }
    );
  };
};
