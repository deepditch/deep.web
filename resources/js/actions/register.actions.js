import { NotifyActions } from "./notify.actions";

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

export const RegisterActionDispatcher = (authService, dispatch) => {
  return (name, email, password) => {
    dispatch(RegisterActions.attempt());

    authService.register(name, email, password).then(
      response => {
        dispatch(NotifyActions.success("You have successfully registered"));
        dispatch(RegisterActions.success(response));
      },
      error => {
        dispatch(NotifyActions.error("Registration failure"));
        dispatch(RegisterActions.failure());
      }
    );
  };
};
