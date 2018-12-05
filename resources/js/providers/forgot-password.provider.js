import ResetPassword from "../components/ResetPassword";
import Forgot from "../components/Forgot";
import { ForgotPasswordActionDispatcher } from "../actions/forgot-password.actions";
import { connect } from "react-redux";

/**
 * Registers dependencies in the container and connects react components to the redux store
 * @param {Container} c the IoC container
 */
export const ForgotPasswordProvider = c => {
  c.register("ForgotPasswordActions", c =>
    new ForgotPasswordActionDispatcher(c.AuthService)
  );

  c.register("ResetPassword", c =>
    connect(
      null,
      dispatch => {
        return {
          resetPassword: c.ForgotPasswordActions.resetPassword(
            dispatch
          )
        };
      }
    )(ResetPassword)
  );

  c.register("Forgot", c => Forgot(c.AuthService));
};
