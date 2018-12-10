import { NotifyActions } from "./notify.actions";

export const  ChangePasswordActionTypes = {
  CHANGE_PASSWORD: "reset_password"
};

export class ChangePasswordActionDispatcher {
  constructor(authService) {
    this.authService = authService;
  }

  changePassword = dispatch => {
    return (current_password, new_password, confirm_new_password) => {
      if (new_password != confirm_new_password) {
        dispatch(NotifyActions.error("New password and new password confirmation must match"));
      }
      this.authService.changePassword(current_password, new_password, confirm_new_password)
      .then(response => {
        console.log('response');
        console.log(response);
        localStorage.setItem("token", response.access_token);
        localStorage.setItem("user", JSON.stringify(response.user));
        dispatch(NotifyActions.success("Your password has been changed."));
      }).catch(error => {
        dispatch(NotifyActions.error(error));
      });
    }
  };
}
