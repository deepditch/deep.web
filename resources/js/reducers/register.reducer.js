import { RegisterActionTypes } from "../actions";

const initialState = {};

/**
 * Updates the register state based on the provided action
 * @param {JSON} state The previous register state
 * @param {JSON} action A redux action
 */
export default function RegisterReducer(state = initialState, action) {
  switch (action.type) {
    case RegisterActionTypes.REGISTER_ATTEMPT:
      return { registering: true, loggedIn: false };
    case RegisterActionTypes.REGISTER_SUCCESS:
      return { loggedIn: false };
    case RegisterActionTypes.REGISTER_FAILURE:
      return { loggedIn: false };
    default:
      return state;
  }
}
