import Logout from "../components/Logout";
import { connect } from "react-redux";
import { CreateLogoutActionDispatcher } from "../actions";

/**
 * Registers dependencies in the container and connects react components to the redux store
 * @param {Container} c the IoC container
 */
export const LogoutProvider = (c) => {
  c.register("Logout", c =>
    connect(
      store => {
        return {};
      },
      dispatch => {
        return {
          logout: CreateLogoutActionDispatcher(c.AuthService, dispatch)
        };
      }
    )(Logout)
  );
}
