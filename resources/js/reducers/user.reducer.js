import { LoginActionTypes, RegisterActionTypes } from "../actions";


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
 * Updates the user state based on the login and register actions
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case LoginActionTypes.LOGIN_ATTEMPT:
      return { loggedIn: false };
    case LoginActionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        token: action.token,
        user: action.user
      };
    case LoginActionTypes.LOGIN_FAILURE:
      return { loggedIn: false };
    case LoginActionTypes.LOGOUT:
      return { loggedIn: false };
    case RegisterActionTypes.REGISTER_SUCCESS:
      return { loggedIn: false, user: action.user };
    default:
      return state;
  }
}
