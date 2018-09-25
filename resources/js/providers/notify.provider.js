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
      store => {
        return {
          notifyType: store.notify.notifyType,
          message: store.notify.message
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
