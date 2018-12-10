import { ChangePasswordActionTypes } from "../actions";

/**
 * Updates the login state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function SettingsReducer(state = {loggedIn: true, user: {}}, action) {
  switch (action.type) {
    case ChangePasswordActionTypes.CHANGE_PASSWORD:
      return { loggedIn: true, token: action.token, success: true};
    default:
      return state;
  }
}
