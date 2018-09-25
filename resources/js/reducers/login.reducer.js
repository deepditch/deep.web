import { LoginActionTypes } from "../actions";

var user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user: user } : { loggedIn: false };

/**
 * Updates the login state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case LoginActionTypes.LOGIN_ATTEMPT:
      return { loggedIn: false, loggingIn: true };
    case LoginActionTypes.LOGIN_SUCCESS:
      return { loggedIn: true, user: action.user };
    case LoginActionTypes.LOGIN_FAILURE:
      return { loggedIn: false };
    case LoginActionTypes.LOGOUT:
      return { loggedIn: false };
    default:
      return state;
  }
}
