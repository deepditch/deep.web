import { NotifyActions } from "./notify.actions";

export const ForgotPasswordActionTypes = {
  RESET_PASSWORD: "reset_password"
};

export class ForgotPasswordActionDispatcher {
  constructor(authService) {
    this.authService = authService;
  }

  resetPassword = dispatch => (password, token) => {
    this.authService.resetPassword(password, token).then(response => {
      dispatch({ type: ForgotPasswordActionTypes.RESET_PASSWORD });
      dispatch(NotifyActions.success("Your password has been reset. You may now login."));
    }).catch(error => {
      dispatch(NotifyActions.success("We failed to update your password."));
    });
  };
}