import LoginForm from "../components/Form/login-form";
import Login from "../components/login";
import { connect } from "react-redux";
import { CreateLoginActionDispatcher } from "../actions";

/**
 * Registers dependencies in the container and connects react components to the redux store
 * @param {Container} c the IoC container
 */
export const LoginProvider = (c) => {
  c.register("LoginForm", c =>
    connect(
      store => {
        return {
          pending: store.login.pending
        }
      },
      dispatch => {
        return {
          login: CreateLoginActionDispatcher(c.AuthService, dispatch)
        };
      }
    )(LoginForm)
  );

  c.register("Login", c => Login(c.LoginForm));
}
