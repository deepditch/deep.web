import { authConstants } from "../actions";

var user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export default function auth(state = initialState, action) {
  switch (action.Type) {
    case authConstants.LOGIN_SUCCESS:
      return { loggedIn: true, user: action.user };
    case authConstants.LOGIN_FAILURE:
      return { loggedIn: false, user: null };
    case authConstants.REGISTER_SUCCESS:
      return { loggedIn: false, user: null };
    case authConstants.REGISTER_FAILURE:
      return { loggedIn: false, user: null };
    case authConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
