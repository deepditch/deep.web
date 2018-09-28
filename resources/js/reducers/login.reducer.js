import { LoginActionTypes } from "../actions";

/**
 * Updates the login state based on the provided action
 * @param {JSON} state The previous login state
 * @param {JSON} action A redux action
 */
export default function LoginReducer(state = {}, action) {
  switch (action.type) {
    case LoginActionTypes.LOGIN_ATTEMPT:
      return { pending: true };
    case LoginActionTypes.LOGIN_SUCCESS:
      return { success: true };
    case LoginActionTypes.LOGIN_FAILURE:
      return { rejected: true };
    default:
      return state;
  }
}
