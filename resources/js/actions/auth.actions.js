import { notifyActions } from "./notify.actions";

export const authConstants = {
  LOGIN_SUCCESS: "login_success",
  LOGIN_FAILURE: "login_failure",
  REGISTER_SUCCESS: "register_success",
  REGISTER_FAILURE: "register_failure",
  LOGOUT: "logout"
};

const login = (authService, dispatch) => {
  return (email, password) => {
    authService.login(email, password).then(
      response => {
        dispatch(notifyActions.success("You have successfully logged in"));
        dispatch(success(response));
      },
      error => {
        dispatch(notifyActions.error("Login failure"));
        dispatch(failure());
      }
    );
  };

  function success(user) {
    return { type: authConstants.LOGIN_SUCCESS, user: user };
  }

  function failure() {
    return { type: authConstants.LOGIN_FAILURE };
  }
};

const register = (authService, dispatch) => {
  return (name, email, password) => {
    authService.register(name, email, password).then(
      response => {
        dispatch(notifyActions.success("You have successfully registered"));
        dispatch(success(response));
      },
      error => {
        dispatch(notifyActions.error("Registration failure"));
        dispatch(failure());
      }
    );
  };

  function success(response) {
    return { type: authConstants.REGISTER_SUCCESS, user: response };
  }

  function failure() {
    return { type: authConstants.REGISTER_FAILURE };
  }
};

export const authActions = {
  login,
  register
};
