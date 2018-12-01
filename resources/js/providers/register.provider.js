import RegistrationForm from "../components/Form/registration-form";
import Register from "../components/Register";
import { connect } from "react-redux";
import { CreateRegisterActionDispatcher } from "../actions";

/**
 * Registers dependencies in the container and connects react components to the redux store
 * @param {Container} c the IoC container
 */
export const RegisterProvider = (c) => {
  c.register("RegistrationForm", c =>
    connect(
      store => {
        return {
          pending: store.register.pending
        }
      },
      dispatch => {
        return {
          register: CreateRegisterActionDispatcher(c.AuthService, dispatch)
        };
      }
    )(RegistrationForm(c.UsersService))
  );

  c.register("Register", c => Register(c.RegistrationForm));
}
