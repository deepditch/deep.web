import React from "react";
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
  return (userName, email, password, organizationName = null, invite_token=null) => {
    dispatch(RegisterActions.attempt());

    authService
      .register(userName, email, password, organizationName, invite_token=null)
      .then(response => {
        dispatch(RegisterActions.success(response.user));
        dispatch(
          NotifyActions.success(
            <>
              <strong>{response.user.name}</strong>, you have been registered and may
              login.
            </>
          )
        );
      })
      .catch(error => {
        dispatch(NotifyActions.error(error));
        dispatch(RegisterActions.failure());
      });
  };
};
