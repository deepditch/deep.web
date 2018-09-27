import { NotifyActions } from "./notify.actions";
import { history } from "../history";

export const RegisterActionTypes = {
  REGISTER_SUCCESS: "register_success",
  REGISTER_FAILURE: "register_failure",
  REGISTER_ATTEMPT: "register_attempt"
};

export const RegisterActions = {
  attempt: () => {
    return { type: RegisterActionTypes.REGISTER_ATTEMPT };
  },
  success: user => {
    return { type: RegisterActionTypes.REGISTER_SUCCESS, user: user };
  },
  failure: () => {
    return { type: RegisterActionTypes.REGISTER_FAILURE };
  }
};

/**
 * Create a register method that dispatches redux actions. Delegates register request to authService
 * @param {AuthService} authService must have a register method : register(name, email, password)
 * @param {function} dispatch the redux dispatch method
 * @returns a register method that dispatches redux actions
 */
export const CreateRegisterActionDispatcher = (authService, dispatch) => {
  return (userName, email, password, organizationName = null) => {
    dispatch(RegisterActions.attempt());

    authService
      .register(userName, email, password, organizationName)
      .then(response => {
        var user = response.user;

        localStorage.setItem("user", JSON.stringify(user));

        dispatch(NotifyActions.success("You have successfully registered"));
        dispatch(RegisterActions.success(user));

        history.push("/login");
      })
      .catch(error => {
        dispatch(NotifyActions.error("Registration failure"));
        dispatch(RegisterActions.failure());

        console.error(error);
      });
  };
};
