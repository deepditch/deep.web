import { notifyConstants } from "../actions";

export default function notify(state = {}, action) {
  switch (action.type) {
    case notifyConstants.NOTIFY_SUCCESS:
      return {
        type: "notify-success",
        message: action.message
      };
    case notifyConstants.NOTIFY_WARN:
      return {
        type: "notify-warn",
        message: action.message
      };
    case notifyConstants.NOTIFY_ERR:
      return {
        type: "notify-error",
        message: action.message
      };
    case notifyConstants.NOTIFY_CLEAR:
      return {};
    default:
      return state;
  }
}
