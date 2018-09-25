import Notify from "../components/Notify";
import { connect } from "react-redux";
import { NotifyActions } from "../actions";

/**
 * Registers dependencies in the container and connects react components to the redux store
 * @param {Container} c the IoC container
 */
export const NotifyProvider = c => {
  c.register("Notify", c =>
    connect(
      state => {
        return {
          notifyType: state.notify.notifyType,
          message: state.notify.message
        };
      },
      dispatch => {
        return {
          clear: () => dispatch(NotifyActions.clear())
        };
      }
    )(Notify)
  );
};
