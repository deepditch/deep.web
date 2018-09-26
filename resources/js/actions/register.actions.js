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
  success: response => {
    return { type: RegisterActionTypes.REGISTER_SUCCESS, response: response };
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
  return (name, email, organization, password) => {
    dispatch(RegisterActions.attempt());

    authService
      .register(name, email, organization, password)
      .then(response => {
        dispatch(NotifyActions.success("You have successfully registered"));
        dispatch(RegisterActions.success(response));
        history.push("/login");
      })
      .catch(error => {
        dispatch(NotifyActions.error("Registration failure"));
        dispatch(RegisterActions.failure());
      });
  };
};
