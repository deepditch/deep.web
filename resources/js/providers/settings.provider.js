import Settings from "../components/Settings";
import { ChangePasswordActionDispatcher } from "../actions/settings.actions";
import { connect } from "react-redux";

/**
 * Registers dependencies in the container and connects react components to the redux store
 * @param {Container} c the IoC container
 */
export const SettingsProvider = c => {
  c.register("ChangePasswordActions", c =>
    new ChangePasswordActionDispatcher(c.AuthService)
  );

  c.register("Settings", c =>
    connect(
      null,
      dispatch => {
        return {
          changePassword: c.ChangePasswordActions.changePassword(
            dispatch
          )
        };
      }
    )(Settings)
  );
};
