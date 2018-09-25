import { LoginActionTypes } from "../actions";

var initialState = {};

try {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  initialState =
    token && user
      ? { loggedIn: true, token: token, user: user }
      : { loggedIn: false };

} catch (error) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  console.error(error);
}

/**
 * Updates the login state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case LoginActionTypes.LOGIN_ATTEMPT:
      return { loggedIn: false, pending: true };
    case LoginActionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        token: action.token,
        user: action.user,
        success: true
      };
    case LoginActionTypes.LOGIN_FAILURE:
      return { loggedIn: false, rejected: true };
    case LoginActionTypes.LOGOUT:
      return { loggedIn: false };
    default:
      return state;
  }
}
