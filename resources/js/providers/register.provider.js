import RegistrationForm from "../components/Form/registration-form";
import Register from "../components/register";
import { connect } from "react-redux";
import { RegisterActionDispatcher } from "../actions";

/**
 * Registers dependencies in the container and connects react components to the redux store
 * @param {Container} c the IoC container
 */
export const RegisterProvider = (c) => {
  c.register("RegistrationForm", c =>
    connect(
      null,
      dispatch => {
        return {
          register: RegisterActionDispatcher(c.AuthService, dispatch)
        };
      }
    )(RegistrationForm)
  );

  c.register("Register", c => Register(c.RegistrationForm));
}
